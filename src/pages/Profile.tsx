import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  Camera,
  Shield,
  Star,
  Calendar,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated."
    });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.name}
                        className="w-24 h-24 rounded-full"
                      />
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'provider' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'company' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {user.role}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleChange('location', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Account Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {user.role === 'provider' ? '47' : '12'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user.role === 'provider' ? 'Jobs Completed' : 'Services Booked'}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="w-5 h-5 text-yellow-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">4.8</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {new Date().getFullYear() - 2023}
                      </p>
                      <p className="text-sm text-gray-600">Years on Platform</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Password</h4>
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Login Sessions</h4>
                    <Button variant="outline">
                      View Active Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your HustlaHub experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email notifications</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS notifications</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Push notifications</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Privacy</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Profile visibility</span>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data sharing preferences</span>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;