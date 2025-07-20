
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Captcha from '@/components/ui/captcha';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaVerified(true);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken('');
    setCaptchaVerified(false);
  };

  const handleCaptchaError = () => {
    setCaptchaToken('');
    setCaptchaVerified(false);
    toast({
      title: "Security verification failed",
      description: "Please try the security verification again.",
      variant: "destructive"
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      toast({
        title: "Security verification required",
        description: "Please complete the security verification to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      // Navigation will be handled by the auth context after successful login
      // The user will be redirected based on their role
        
    } catch (error: any) {
      // Error handling is done in the auth context
      console.error('Login error:', error);
      // Reset captcha on login failure
      setCaptchaVerified(false);
      setCaptchaToken('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - HustlaHub | Access Your Professional Services Account</title>
        <meta name="description" content="Login to your HustlaHub account to access Kenya's leading professional services marketplace. Secure access to book services, manage bookings, and connect with verified providers." />
        <meta name="keywords" content="HustlaHub login, Kenya services login, professional services account, secure login" />
        <link rel="canonical" href="https://hustlahub.co.ke/login" />
        <meta property="og:title" content="Login - HustlaHub Professional Services" />
        <meta property="og:description" content="Secure login to access Kenya's leading professional services marketplace" />
        <meta property="og:url" content="https://hustlahub.co.ke/login" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-green-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your HustlaHub account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Security Verification</Label>
                <Captcha
                  onVerify={handleCaptchaVerify}
                  onExpire={handleCaptchaExpire}
                  onError={handleCaptchaError}
                  theme="light"
                  size="normal"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading || !captchaVerified}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-red-600 hover:text-red-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
