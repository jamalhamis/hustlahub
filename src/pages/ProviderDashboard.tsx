
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  MapPin, 
  Calendar,
  DollarSign,
  User,
  Settings,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { generateUniqueId } from '@/utils/idGenerator';
import JitengeAccount from '@/components/JitengeAccount';

const ProviderDashboard = () => {
  const [balance, setBalance] = useState(2450);
  const [copiedId, setCopiedId] = useState(false);
  
  // Generate or get provider ID (in real app, this would come from auth context)
  const providerId = generateUniqueId('PROV');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const recentJobs = [
    {
      id: 1,
      service: 'KRA PIN Registration',
      customer: 'John Doe',
      amount: 300,
      status: 'completed',
      date: '2024-01-15',
      rating: 5
    },
    {
      id: 2,
      service: 'Business Name Registration',
      customer: 'Jane Smith',
      amount: 1000,
      status: 'in-progress',
      date: '2024-01-14'
    },
    {
      id: 3,
      service: 'Tax Compliance Certificate',
      customer: 'Mike Johnson',
      amount: 800,
      status: 'pending',
      date: '2024-01-13'
    }
  ];

  const stats = [
    { label: 'Total Earnings', value: `KSh ${balance.toLocaleString()}`, icon: DollarSign },
    { label: 'Jobs Completed', value: '47', icon: CheckCircle },
    { label: 'Average Rating', value: '4.8', icon: Star },
    { label: 'Response Time', value: '2 hrs', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your services and track your earnings</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wallet">Jitenge Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Provider ID Card */}
            <Card className="bg-gradient-to-r from-red-50 to-green-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Provider ID</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Share this ID with customers for verification when you meet them
                    </p>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-3 py-2 rounded-md text-red-600 font-mono text-lg border">
                        {providerId}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(providerId)}
                        className="flex items-center space-x-1"
                      >
                        {copiedId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedId ? 'Copied!' : 'Copy'}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">Verified Provider</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <stat.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Jobs */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Jobs</CardTitle>
                    <CardDescription>Your latest service requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{job.service}</h4>
                            <p className="text-sm text-gray-600">Customer: {job.customer}</p>
                            <p className="text-sm text-gray-600">Date: {job.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">KSh {job.amount.toLocaleString()}</p>
                            <Badge 
                              className={
                                job.status === 'completed' ? 'bg-green-100 text-green-800' :
                                job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {job.status}
                            </Badge>
                            {job.rating && (
                              <div className="flex items-center mt-1">
                                {[...Array(job.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <Settings className="w-4 h-4 mr-2" />
                      Update Profile
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Messages
                    </Button>
                    <Button variant="outline" className="w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wallet">
            <JitengeAccount />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderDashboard;
