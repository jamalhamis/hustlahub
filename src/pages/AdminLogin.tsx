
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Shield, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [step, setStep] = useState(1);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms'>('email');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate admin key first
    if (adminKey !== 'ADMIN2024') {
      toast({
        title: "Access denied",
        description: "Invalid administrator key.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // Simulate initial authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2); // Move to 2FA step
      toast({
        title: "Admin verification required",
        description: "Please verify your identity to access admin panel."
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (verificationCode === '123456') {
      try {
        await login(email, password, 'admin');
        toast({
          title: "Admin login successful!",
          description: "Welcome to the admin panel."
        });
        navigate('/admin');
      } catch (error) {
        toast({
          title: "Authentication failed",
          description: "Admin login error.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Verification failed",
        description: "Please enter the correct verification code.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const resendCode = () => {
    toast({
      title: "Admin code sent!",
      description: `Secure verification code sent to your ${verificationMethod === 'email' ? 'email' : 'phone'}.`
    });
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-red-900 p-4">
        <Card className="w-full max-w-md border-red-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white h-8 w-8" />
            </div>
            <CardTitle className="text-2xl">Admin Verification</CardTitle>
            <CardDescription>Enter the secure verification code</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerification} className="space-y-4">
              <div className="space-y-2">
                <Label>Verification Method</Label>
                <Select value={verificationMethod} onValueChange={(value: 'email' | 'sms') => setVerificationMethod(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Secure Email</SelectItem>
                    <SelectItem value="sms">Secure SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Admin Verification Code</Label>
                <Input
                  id="code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit admin code"
                  maxLength={6}
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Access Admin Panel'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resendCode}
                >
                  Resend
                </Button>
              </div>

              <p className="text-xs text-gray-600 text-center">
                For demo: Use code <strong>123456</strong>
              </p>
            </form>

            <div className="mt-4 text-center">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back to Admin Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-red-900 p-4">
      <Card className="w-full max-w-md border-red-200">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white h-8 w-8" />
          </div>
          <CardTitle className="text-2xl text-red-800">Administrator Access</CardTitle>
          <CardDescription>Secure login for system administrators</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInitialLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminKey" className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Administrator Key
              </Label>
              <Input
                id="adminKey"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter administrator key"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Continue to Verification'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Demo admin key: <strong>ADMIN2024</strong>
            </p>
            <Link to="/login" className="text-sm text-red-600 hover:text-red-700 font-medium">
              Regular User Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
