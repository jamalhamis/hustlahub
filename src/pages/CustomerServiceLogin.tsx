
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Headphones, Shield } from 'lucide-react';

const CustomerServiceLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serviceKey, setServiceKey] = useState('');
  const [step, setStep] = useState(1);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms'>('email');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate service key first
    if (serviceKey !== 'CS2024') {
      toast({
        title: "Access denied",
        description: "Invalid customer service key.",
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
        title: "Customer service verification required",
        description: "Please verify your identity to access the support panel."
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
      toast({
        title: "Customer service login successful!",
        description: "Welcome to the customer service panel."
      });
      navigate('/customer-service');
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
      title: "Service code sent!",
      description: `Verification code sent to your ${verificationMethod === 'email' ? 'email' : 'phone'}.`
    });
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md border-blue-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white h-8 w-8" />
            </div>
            <CardTitle className="text-2xl">CS Verification</CardTitle>
            <CardDescription>Enter the verification code to access support panel</CardDescription>
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
                    <SelectItem value="email">Work Email</SelectItem>
                    <SelectItem value="sms">Work Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">CS Verification Code</Label>
                <Input
                  id="code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Access Support Panel'}
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
                Back to CS Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md border-blue-200">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Headphones className="text-white h-8 w-8" />
          </div>
          <CardTitle className="text-2xl text-blue-800">Customer Service Portal</CardTitle>
          <CardDescription>Secure access for customer service representatives</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInitialLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serviceKey" className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Service Access Key
              </Label>
              <Input
                id="serviceKey"
                type="password"
                value={serviceKey}
                onChange={(e) => setServiceKey(e.target.value)}
                placeholder="Enter service key"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">CS Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter customer service email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">CS Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Continue to Verification'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Demo service key: <strong>CS2024</strong>
            </p>
            <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Regular User Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerServiceLogin;
