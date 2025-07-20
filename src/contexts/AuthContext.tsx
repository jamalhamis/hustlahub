import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  unique_id: string;
  name: string;
  email: string;
  role: 'guest' | 'customer' | 'provider' | 'company' | 'admin';
  avatar?: string;
  phone?: string;
  location?: string;
  id_number?: string;
  kra_pin?: string;
  is_verified: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  role: 'customer' | 'provider' | 'company';
  id_number?: string;
  kra_pin?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      console.log('Fetching profile for user:', authUser.id);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (!data && !error) {
        // Profile doesn't exist, create one
        console.log('Profile not found, creating new profile');
        const newProfile = {
          id: authUser.id,
          unique_id: `USR-${authUser.id.slice(0, 8)}`,
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || '',
          email: authUser.email!,
          role: (authUser.user_metadata?.role as 'customer' | 'provider' | 'company') || 'customer',
          phone: authUser.user_metadata?.phone || null,
          location: authUser.user_metadata?.location || null,
          id_number: authUser.user_metadata?.id_number || null,
          kra_pin: authUser.user_metadata?.kra_pin || null,
          is_verified: false
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert([newProfile])
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }
        
        console.log('Profile created successfully:', createdProfile);
        setUser(createdProfile);
        
        // Create Jitenge account
        const { error: accountError } = await supabase
          .from('jitenge_accounts')
          .insert([{
            user_id: authUser.id,
            balance: 0.00
          }]);

        if (accountError) {
          console.error('Error creating Jitenge account:', accountError);
        }
        
      } else if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      } else {
        console.log('Profile fetched successfully:', data);
        setUser(data);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      toast({
        title: "Profile Error",
        description: "There was an error loading your profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const login = async (email: string, password: string, role?: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      console.log('Login successful:', data.user?.email);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to HustlaHub!"
      });
      
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      console.log('Attempting registration for:', userData.email);
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
            phone: userData.phone,
            location: userData.location,
            id_number: userData.id_number,
            kra_pin: userData.kra_pin,
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Registration successful:', data.user.email);
        
        // The profile will be created automatically by the auth state change listener
        toast({
          title: "Registration Successful",
          description: "Welcome to HustlaHub! Your account has been created."
        });
      }
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out user');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out."
      });
      
    } catch (error: any) {
      console.error('Logout failed:', error);
      toast({
        title: "Logout Error",
        description: error.message || "There was an error logging out.",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};