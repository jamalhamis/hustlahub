
# Jitenge Services Hub - Complete Development Guide

## Prerequisites
You already have the following installed:
- ✅ VS Code
- ✅ Git
- ✅ Node.js
- ✅ PostgreSQL
- ✅ PgAdmin

## Step-by-Step Setup Instructions

### 1. Clone the Repository
```bash
# Open terminal in VS Code (Ctrl+`)
git clone <YOUR_GIT_REPOSITORY_URL>
cd hustlahub

# Install dependencies
npm install
```

### 2. Set Up Supabase Integration (RECOMMENDED)

#### 2.1 Create Supabase Account and Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign Up"
3. Sign up with your email or GitHub account
4. Once logged in, click "New Project"
5. Fill in project details:
   - **Organization**: Create new or select existing
   - **Project Name**: `hustlahub-dev` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Select "Free" for development
6. Click "Create new project"
7. Wait 2-3 minutes for project setup to complete

#### 2.2 Get Supabase Configuration Keys
1. In your Supabase dashboard, go to **Settings** (gear icon on left sidebar)
2. Click **API** in the settings menu
3. Copy and save these values:
   - **Project URL** (starts with https://xxx.supabase.co)
   - **anon public key** (starts with eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
   - **service_role secret key** (starts with eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)

#### 2.3 Set Up Database Schema in Supabase
1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste the following schema:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    unique_id VARCHAR(50) UNIQUE NOT NULL DEFAULT ('USR-' || generate_random_uuid()::text),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL DEFAULT 'customer', -- 'customer', 'provider', 'company', 'admin'
    avatar TEXT,
    location VARCHAR(255),
    id_number VARCHAR(20),
    kra_pin VARCHAR(20),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    max_price DECIMAL(10,2), -- for range pricing
    price_type VARCHAR(20) DEFAULT 'Fixed', -- 'Fixed' or 'Range'
    provider_id UUID REFERENCES public.user_profiles(id),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_id UUID REFERENCES public.services(id),
    customer_id UUID REFERENCES public.user_profiles(id),
    provider_id UUID REFERENCES public.user_profiles(id),
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'
    amount DECIMAL(10,2) NOT NULL,
    location VARCHAR(255),
    scheduled_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Jitenge Accounts table
CREATE TABLE public.jitenge_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) UNIQUE,
    balance DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    from_user_id UUID REFERENCES public.user_profiles(id),
    to_user_id UUID REFERENCES public.user_profiles(id),
    amount DECIMAL(10,2) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL, -- 'payment', 'deposit', 'withdrawal', 'transfer'
    status VARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'Completed', 'Failed'
    description TEXT,
    booking_id UUID REFERENCES public.bookings(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES public.bookings(id),
    customer_id UUID REFERENCES public.user_profiles(id),
    provider_id UUID REFERENCES public.user_profiles(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'booking', 'payment', 'system'
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security Policies
-- User profiles: users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Services: providers can manage their services, everyone can view active services
CREATE POLICY "Anyone can view active services" ON public.services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Providers can manage own services" ON public.services
    FOR ALL USING (auth.uid() = provider_id);

-- Bookings: customers and providers can see their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
    FOR SELECT USING (auth.uid() = customer_id OR auth.uid() = provider_id);

CREATE POLICY "Customers can create bookings" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update own bookings" ON public.bookings
    FOR UPDATE USING (auth.uid() = customer_id OR auth.uid() = provider_id);

-- Jitenge accounts: users can only see their own account
CREATE POLICY "Users can view own jitenge account" ON public.jitenge_accounts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own jitenge account" ON public.jitenge_accounts
    FOR UPDATE USING (auth.uid() = user_id);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jitenge_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
```

4. Click **Run** to execute the query
5. You should see "Success. No rows returned" message

#### 2.4 Enable Authentication in Supabase
1. In Supabase dashboard, go to **Authentication** (left sidebar)
2. Go to **Settings** tab
3. Configure the following:
   - **Site URL**: `http://localhost:5173` (your local development URL)
   - **Redirect URLs**: Add `http://localhost:5173/**` 
4. Go to **Providers** tab
5. Configure **Email** provider:
   - Enable **Email** authentication
   - Disable **Confirm email** for development (enable in production)
6. Click **Save**

#### 2.5 Insert Sample Data (Optional)
1. Go back to **SQL Editor**
2. Create a new query and run:

```sql
-- Insert sample user profiles (these will be created when users register)
-- We'll create them manually for testing

-- Insert sample services (you'll need to replace provider_id with actual user UUIDs after registration)
INSERT INTO public.services (name, category, subcategory, price, price_type, description) VALUES
('Mathematics Tutoring (Grade 1)', 'education', 'primary-grade1-3', 299.00, 'Fixed', 'Professional math tutoring for Grade 1 students'),
('Plumbing Services', 'home-services', 'plumbing-electrical', 999.00, 'Fixed', 'Professional plumbing services for homes'),
('Logo Design', 'digital-freelancing', 'graphic-design', 500.00, 'Fixed', 'Custom logo design for businesses');
```

#### 2.6 Install Supabase Client in Your Project
1. Open terminal in your project directory
2. Install Supabase JavaScript client:
```bash
npm install @supabase/supabase-js
```

#### 2.7 Configure Environment Variables
1. Create a `.env.local` file in your project root:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# App Configuration
VITE_APP_URL=http://localhost:5173
NODE_ENV=development
```

2. Replace `your_project_url_here` and `your_anon_key_here` with the values from step 2.2

#### 2.8 Create Supabase Client Configuration
1. Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### 2.9 Update Authentication Context
1. Update `src/contexts/AuthContext.tsx` to use Supabase:
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

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
  login: (email: string, password: string) => Promise<void>;
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const newProfile = {
          id: authUser.id,
          unique_id: `USR-${authUser.id.slice(0, 8)}`,
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || '',
          email: authUser.email!,
          role: 'customer' as const,
          is_verified: false
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert([newProfile])
          .select()
          .single();

        if (createError) throw createError;
        setUser(createdProfile);
      } else if (error) {
        throw error;
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          role: userData.role,
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      // Create user profile
      const profile = {
        id: data.user.id,
        unique_id: `USR-${data.user.id.slice(0, 8)}`,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        phone: userData.phone,
        location: userData.location,
        id_number: userData.id_number,
        kra_pin: userData.kra_pin,
        is_verified: false
      };

      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([profile]);

      if (profileError) throw profileError;

      // Create Jitenge account
      const { error: accountError } = await supabase
        .from('jitenge_accounts')
        .insert([{
          user_id: data.user.id,
          balance: 0.00
        }]);

      if (accountError) throw accountError;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3. Alternative: Local PostgreSQL Setup (Not Recommended)

If you prefer to use local PostgreSQL instead of Supabase:

#### 3.1 Create Database
Open PgAdmin and create a new database:
1. Right-click on "Databases" → Create → Database
2. Name: `hustlahub_dev`
3. Owner: `postgres` (or your preferred user)
4. Click "Save"

#### 3.2 Create Database Tables
Run the SQL commands from the original setup guide in PgAdmin Query Tool.

### 4. Environment Configuration

Create a `.env.local` file in your project root (choose one approach):

**For Supabase (Recommended):**
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# App Configuration
VITE_APP_URL=http://localhost:5173
NODE_ENV=development
```

**For Local PostgreSQL:**
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/hustlahub_dev
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hustlahub_dev
DB_USER=postgres
DB_PASSWORD=your_password

# App Configuration
PORT=5173
NODE_ENV=development
```

### 5. Run the Application

#### 5.1 Start Development Server
```bash
# Start the frontend development server
npm run dev
```

#### 5.2 Access the Application
- Frontend: http://localhost:5173
- The app should open automatically in your browser

### 6. Testing Authentication and Database Integration

#### 6.1 Test User Registration
1. Navigate to http://localhost:5173/register
2. Fill in the registration form
3. Check Supabase Dashboard → Authentication → Users to see the new user
4. Check Database → user_profiles table for the profile data

#### 6.2 Test User Login
1. Navigate to http://localhost:5173/login
2. Use the credentials you registered with
3. Verify you're logged in and redirected to the appropriate dashboard

#### 6.3 Test Service Creation (for Providers)
1. Register as a service provider
2. Navigate to the provider dashboard
3. Add a new service
4. Check Supabase Database → services table for the new entry

#### 6.4 Test Booking Flow
1. As a customer, browse and book a service
2. Check the bookings table in Supabase
3. Verify wallet balance updates in jitenge_accounts

### 7. Supabase Dashboard Navigation

#### 7.1 Key Sections to Monitor:
- **Authentication → Users**: View registered users
- **Database → Tables**: Browse all data tables
- **SQL Editor**: Run custom queries
- **API Docs**: View auto-generated API documentation
- **Logs**: Monitor real-time database activity

#### 7.2 Useful Queries for Testing:
```sql
-- View all users
SELECT * FROM auth.users;
SELECT * FROM public.user_profiles;

-- View services with provider names
SELECT s.*, up.name as provider_name 
FROM public.services s 
LEFT JOIN public.user_profiles up ON s.provider_id = up.id;

-- View recent bookings
SELECT 
    b.*,
    s.name as service_name,
    c.name as customer_name,
    p.name as provider_name
FROM public.bookings b
LEFT JOIN public.services s ON b.service_id = s.id
LEFT JOIN public.user_profiles c ON b.customer_id = c.id
LEFT JOIN public.user_profiles p ON b.provider_id = p.id
ORDER BY b.created_at DESC;
```

### 8. Troubleshooting Common Issues

#### 8.1 Environment Variables Not Loading
- Ensure `.env.local` is in the project root
- Restart the development server after adding variables
- Check that variable names start with `VITE_`

#### 8.2 Supabase Connection Issues
- Verify project URL and keys in Supabase dashboard
- Check that RLS policies are correctly set up
- Ensure your local URL is added to redirect URLs in Supabase Auth settings

#### 8.3 Database Permission Errors
- Review Row Level Security policies
- Check that authenticated users have proper access to tables
- Verify user roles are correctly assigned

### 9. Production Deployment with Supabase

When ready for production:
1. Update environment variables with production Supabase project
2. Enable email confirmation in Supabase Auth settings
3. Configure custom SMTP for email notifications
4. Set up proper RLS policies for production security
5. Configure custom domain in Supabase if needed
6. Enable database backups
7. Set up monitoring and alerts

### 10. Benefits of Supabase Integration

✅ **Real Authentication**: Secure user login/logout with JWT tokens
✅ **Data Persistence**: All data stored in PostgreSQL database
✅ **Real-time Updates**: Automatic UI updates when data changes
✅ **Row Level Security**: Built-in authorization and data protection
✅ **Scalability**: Automatically scales with your user base
✅ **API Generation**: Auto-generated REST and GraphQL APIs
✅ **File Storage**: Built-in file upload and storage capabilities
✅ **Edge Functions**: Serverless functions for complex business logic

This setup provides a production-ready foundation for your Jitenge Services Hub application with real authentication, database persistence, and all the functionality needed for a complete service marketplace platform.

---

## 🚀 Performance Optimization for High Traffic

Given your requirement to handle millions of requests and concurrent users, here are critical optimizations:

### 1. Frontend Performance Optimizations

#### Code Splitting and Lazy Loading
The app is already optimized with lazy loading in `App.tsx`:
```typescript
// Lazy load components for better performance
const Services = lazy(() => import("./pages/Services"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
```

#### Virtual Scrolling for Large Lists
For service listings with thousands of items:
```typescript
// Use the custom useVirtualList hook
import { useVirtualList } from '@/hooks/useVirtualList';

const { visibleItems, totalHeight, setScrollTop } = useVirtualList({
  items: services,
  itemHeight: 200,
  containerHeight: 600,
  overscan: 5
});
```

#### Optimized React Query Configuration
```typescript
// Configured for high performance in App.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    }
  }
});
```

### 2. Database Performance Optimizations

#### Essential Indexes for Supabase
Run these in your Supabase SQL Editor:
```sql
-- Critical indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_location ON public.services(location);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_provider ON public.services(provider_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_provider ON public.bookings(provider_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_location ON public.user_profiles(location);

-- Composite indexes for complex queries
CREATE INDEX IF NOT EXISTS idx_services_category_active ON public.services(category, is_active);
CREATE INDEX IF NOT EXISTS idx_services_location_active ON public.services(location, is_active);
```

#### Connection Pooling
Supabase automatically handles connection pooling, but ensure your queries are optimized:
```sql
-- Use LIMIT and OFFSET for pagination
SELECT * FROM public.services 
WHERE is_active = true 
AND category = $1
ORDER BY created_at DESC 
LIMIT 20 OFFSET $2;
```

### 3. Caching Strategy

#### Browser Caching
Configure in your hosting platform:
```javascript
// Headers for static assets
'Cache-Control': 'public, max-age=31536000, immutable'

// Headers for API responses
'Cache-Control': 'public, max-age=300'
```

#### Service Worker for Offline Support
```javascript
// public/sw.js
const CACHE_NAME = 'jitenge-v1';
const urlsToCache = [
  '/',
  '/services',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### 4. Content Delivery Network (CDN)

Deploy with platforms that provide global CDN:
- **Vercel**: Automatic CDN with edge functions
- **Netlify**: Global CDN with edge computing
- **Cloudflare Pages**: Global CDN with R2 storage

---

## 📱 Mobile App Development with Capacitor

Transform your web app into a native mobile app for Android and iOS.

### Prerequisites for Mobile Development
- Node.js 16+ installed
- Android Studio (for Android development)
- Xcode (for iOS development - Mac only)
- Java Development Kit (JDK) 8 or 11
- Android SDK

### Step 1: Install Capacitor Dependencies

```bash
# Install Capacitor core and CLI
npm install @capacitor/core @capacitor/cli

# Install platform-specific packages
npm install @capacitor/android @capacitor/ios
```

### Step 2: Initialize Capacitor

```bash
# Initialize Capacitor in your project
npx cap init
```

When prompted, use these values:
- **App ID**: `com.jitenge.serviceshub`
- **App Name**: `Jitenge Services Hub`

### Step 3: Configure Capacitor

Create `capacitor.config.ts` in your project root:
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jitenge.serviceshub',
  appName: 'Jitenge Services Hub',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: false
    }
  }
};

export default config;
```

### Step 4: Build Your Web App

```bash
# Build the production version
npm run build
```

### Step 5: Add Android Platform

```bash
# Add Android platform
npx cap add android
```

### Step 6: Android Studio Setup Guide

#### 6.1 Install Android Studio
1. Download from https://developer.android.com/studio
2. Follow the installation wizard
3. Install Android SDK and Android Virtual Device (AVD)

#### 6.2 Configure Android SDK
1. Open Android Studio
2. Go to **File > Settings > Appearance & Behavior > System Settings > Android SDK**
3. Install at least **API level 22** (Android 5.1) or higher
4. Install **Android SDK Build-Tools**
5. Install **Android Emulator**
6. Note the SDK path for environment variables

#### 6.3 Set Environment Variables
Add to your `~/.bashrc`, `~/.zshrc`, or Windows Environment Variables:
```bash
# Android SDK paths
export ANDROID_HOME=$HOME/Android/Sdk  # Linux/Mac
# Windows: ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Step 7: Sync and Open in Android Studio

```bash
# Sync your web app with Android project
npx cap sync android

# Open Android project in Android Studio
npx cap open android
```

### Step 8: Running on Your Physical Android Device

#### 8.1 Enable Developer Options
1. Go to **Settings > About Phone**
2. Tap **Build Number** 7 times
3. Go back to **Settings > Developer Options**
4. Enable **USB Debugging**
5. Enable **Install via USB** (if available)

#### 8.2 Connect and Run
1. Connect your Android device via USB
2. Allow USB debugging when prompted
3. In Android Studio, your device should appear in the device list
4. Click the **green "Run" button** or use:
```bash
npx cap run android
```

### Step 9: Running on Android Emulator

#### 9.1 Create Virtual Device
1. In Android Studio, go to **Tools > AVD Manager**
2. Click **Create Virtual Device**
3. Choose a device (e.g., **Pixel 4**, **Pixel 6**)
4. Select a system image (**API 30+** recommended)
5. Configure performance settings:
   - **RAM**: 2048 MB or higher
   - **VM Heap**: 512 MB
   - **Internal Storage**: 6 GB
6. Click **Finish**

#### 9.2 Start Emulator and Run
1. In AVD Manager, click the **Play** button next to your virtual device
2. Wait for emulator to fully boot
3. Run your app:
```bash
npx cap run android
```

### Step 10: Development with Live Reload

For faster development cycles:

#### 10.1 Find Your Local IP Address
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig | grep inet
```

#### 10.2 Update Capacitor Config for Development
```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  // ... other config
  server: {
    url: 'http://192.168.1.XXX:5173', // Replace with your IP
    cleartext: true
  }
};
```

#### 10.3 Start Development Server and Sync
```bash
# Start development server
npm run dev

# In another terminal, sync changes
npx cap sync android
npx cap run android
```

### Step 11: Troubleshooting Android Development

#### Common Issues and Solutions:

**1. Gradle Build Fails:**
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew build
```

**2. Device Not Detected:**
- Check USB debugging is enabled
- Try different USB cable
- Install device-specific USB drivers
- Run `adb devices` to verify connection

**3. App Crashes on Launch:**
```bash
# Check Android logs
adb logcat | grep -i jitenge
```

**4. Network Issues:**
- Add network security config in `android/app/src/main/res/xml/network_security_config.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">192.168.1.0/24</domain>
    </domain-config>
</network-security-config>
```

- Update `android/app/src/main/AndroidManifest.xml`:
```xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
    android:usesCleartextTraffic="true">
```

### Step 12: Building for Production

#### 12.1 Production Build
```bash
# Build production web app
npm run build

# Sync with Android
npx cap sync android
```

#### 12.2 Generate Signed APK/Bundle
1. In Android Studio: **Build > Generate Signed Bundle/APK**
2. Choose **Android App Bundle** (recommended for Play Store)
3. Create or select your keystore
4. Fill in key details and passwords
5. Choose **release** build variant
6. Click **Finish**

#### 12.3 Test Release Build
- Install the generated APK on your device
- Test all functionality thoroughly
- Check performance on different devices

### Step 13: Publishing to Google Play Store

1. **Create Google Play Developer Account** ($25 one-time fee)
2. **Prepare Store Listing**:
   - App screenshots (multiple screen sizes)
   - App description and keywords
   - Privacy policy URL
   - Content rating questionnaire
3. **Upload App Bundle** through Google Play Console
4. **Set up pricing** and distribution
5. **Submit for review**

---

## 🔧 Advanced Performance Monitoring

### 1. Web Vitals Monitoring
Add to your main component:
```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Monitor Core Web Vitals
getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 2. Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev vite-bundle-analyzer

# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

### 3. Database Query Optimization
Use Supabase's built-in performance monitoring:
- Monitor query performance in Supabase Dashboard
- Use `explain` to analyze query execution plans
- Implement proper pagination for large datasets

---

## Next Steps After Complete Setup

1. **Test all authentication flows** (register, login, logout)
2. **Verify data persistence** in Supabase dashboard  
3. **Test service creation and booking flows**
4. **Test mobile app on multiple devices**
5. **Implement push notifications** for mobile app
6. **Set up analytics** (Google Analytics, Mixpanel)
7. **Configure error monitoring** (Sentry, LogRocket)
8. **Implement payment integration** (M-Pesa, Stripe)
9. **Add real-time features** using Supabase subscriptions
10. **Performance testing** under load
11. **Security audit** and penetration testing
