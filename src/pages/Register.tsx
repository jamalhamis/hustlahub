
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Upload, FileText } from 'lucide-react';
import Captcha from '@/components/ui/captcha';
import { Helmet } from 'react-helmet-async';

type UserRole = 'guest' | 'customer' | 'provider' | 'company' | 'admin';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  location: string;
  role: UserRole;
  idNumber: string;
  kraPin: string;
  certificates: File[];
  termsAccepted: boolean;
  captchaVerified: boolean;
}

const Register = () => {
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get('role') as UserRole;
  
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    role: preselectedRole || 'customer',
    idNumber: '',
    kraPin: '',
    certificates: [],
    termsAccepted: false,
    captchaVerified: false,
  });

  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleCaptchaVerify = (token: string) => {
    setFormData(prev => ({ ...prev, captchaVerified: true }));
  };

  const handleCaptchaExpire = () => {
    setFormData(prev => ({ ...prev, captchaVerified: false }));
  };

  const handleCaptchaError = () => {
    setFormData(prev => ({ ...prev, captchaVerified: false }));
    toast({
      title: "Security verification failed",
      description: "Please try the security verification again.",
      variant: "destructive"
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, certificates: [...prev.certificates, ...files] }));
    }
  };

  const removeCertificate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.termsAccepted) {
      toast({
        title: "Terms and conditions required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.idNumber.trim()) {
      toast({
        title: "ID number required",
        description: "Please enter your ID number.",
        variant: "destructive"
      });
      return;
    }

    // Validate KRA PIN for providers and companies
    if ((formData.role === 'provider' || formData.role === 'company') && !formData.kraPin.trim()) {
      toast({
        title: "KRA PIN required",
        description: "Please enter your KRA PIN for tax compliance.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.captchaVerified) {
      toast({
        title: "Security verification required",
        description: "Please complete the security verification to continue.",
        variant: "destructive"
      });
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        role: formData.role as 'customer' | 'provider' | 'company',
        id_number: formData.idNumber,
        kra_pin: formData.kraPin
      });
      
      // Navigate based on role after successful registration
      switch (formData.role) {
        case 'admin': navigate('/admin'); break;
        case 'provider': navigate('/provider'); break;
        case 'company': navigate('/company'); break;
        case 'customer': navigate('/customer'); break;
        default: navigate('/');
      }
      
    } catch (error) {
      // Error handling is done in the auth context
      console.error('Registration error:', error);
      // Reset captcha on registration failure
      setFormData(prev => ({ ...prev, captchaVerified: false }));
    }
  };

  const handleChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value as UserRole }));
  };

  const isProviderOrCompany = formData.role === 'provider' || formData.role === 'company';

  return (
    <>
      <Helmet>
        <title>Register - Join HustlaHub | Kenya's Leading Professional Services Platform</title>
        <meta name="description" content="Join HustlaHub today! Register as a customer to book services or as a provider to offer your professional services. Secure registration with verified accounts across Kenya." />
        <meta name="keywords" content="HustlaHub register, Kenya services signup, professional services registration, service provider signup, customer registration" />
        <link rel="canonical" href="https://hustlahub.co.ke/register" />
        <meta property="og:title" content="Register - Join HustlaHub Professional Services" />
        <meta property="og:description" content="Join Kenya's leading professional services marketplace. Register as customer or provider today!" />
        <meta property="og:url" content="https://hustlahub.co.ke/register" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-green-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <CardTitle className="text-2xl">Join HustlaHub</CardTitle>
            <CardDescription>
              {preselectedRole === 'provider' && 'Register as a Service Provider'}
              {preselectedRole === 'company' && 'Register Your Company'}
              {(!preselectedRole || preselectedRole === 'customer') && 'Create your account to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => handleChange('idNumber', e.target.value)}
                placeholder="Enter your national ID number"
                required
              />
            </div>

            {isProviderOrCompany && (
              <div className="space-y-2">
                <Label htmlFor="kraPin">KRA PIN</Label>
                <Input
                  id="kraPin"
                  value={formData.kraPin}
                  onChange={(e) => handleChange('kraPin', e.target.value)}
                  placeholder="Enter your KRA PIN"
                  required
                />
                <p className="text-xs text-gray-600">Required for tax compliance</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+254700000000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., Nairobi, Kenya"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="provider">Service Provider (Hustla)</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isProviderOrCompany && (
              <div className="space-y-2">
                <Label>Certificates (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="certificates"
                  />
                  <label
                    htmlFor="certificates"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload certificates
                    </span>
                    <span className="text-xs text-gray-400">
                      PDF, DOC, JPG, PNG (Max 5MB each)
                    </span>
                  </label>
                </div>
                
                {formData.certificates.length > 0 && (
                  <div className="space-y-2">
                    {formData.certificates.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCertificate(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-600">
                  You can also add certificates later in your account settings
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-3">
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
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleChange('termsAccepted', checked as boolean)}
                />
                <div className="text-sm leading-none">
                  <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-red-600 hover:text-red-700 underline">
                      Terms and Conditions
                    </Link>
                    , {' '}
                    <Link to="/privacy" className="text-red-600 hover:text-red-700 underline">
                      Privacy Policy
                    </Link>
                    , and {' '}
                    <Link to="/service-agreement" className="text-red-600 hover:text-red-700 underline">
                      Service Provider Agreement
                    </Link>
                  </Label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={isLoading || !formData.captchaVerified}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default Register;
