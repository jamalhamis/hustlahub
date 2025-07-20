
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Star,
  Clock,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { generateUniqueId } from '@/utils/idGenerator';
import JitengeAccount from '@/components/JitengeAccount';

const CompanyDashboard = () => {
  const [totalEarnings, setTotalEarnings] = useState(125000);
  const [copiedId, setCopiedId] = useState(false);
  
  // Generate or get company ID (in real app, this would come from auth context)
  const companyId = generateUniqueId('COMP');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const recentJobs = [
    {
      id: 1,
      service: 'Company Registration Package',
      client: 'Startup Kenya Ltd',
      amount: 5000,
      status: 'completed',
      date: '2024-01-15',
      rating: 5,
      provider: 'John Mwangi'
    },
    {
      id: 2,
      service: 'Tax Compliance Audit',
      client: 'SME Solutions',
      amount: 8000,
      status: 'in-progress',
      date: '2024-01-14',
      provider: 'Sarah Wanjiku'
    },
    {
      id: 3,
      service: 'Legal Documentation',
      client: 'Tech Innovators',
      amount: 12000,
      status: 'pending',
      date: '2024-01-13',
      provider: 'Peter Kimani'
    }
  ];

  const companyStats = [
    { label: 'Total Revenue', value: `KSh ${totalEarnings.toLocaleString()}`, icon: DollarSign },
    { label: 'Active Providers', value: '12', icon: Users },
    { label: 'Completed Projects', value: '89', icon: CheckCircle },
    { label: 'Average Rating', value: '4.9', icon: Star }
  ];

  const topProviders = [
    { name: 'John Mwangi', earnings: 45000, jobs: 23, rating: 4.9 },
    { name: 'Sarah Wanjiku', earnings: 38000, jobs: 19, rating: 4.8 },
    { name: 'Peter Kimani', earnings: 32000, jobs: 16, rating: 4.7 },
    { name: 'Grace Mutiso', earnings: 28000, jobs: 14, rating: 4.8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your business services and provider network</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="wallet">Jitenge Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Company ID Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Company ID</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Share this ID with clients for verification and official correspondence
                    </p>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-3 py-2 rounded-md text-blue-600 font-mono text-lg border">
                        {companyId}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(companyId)}
                        className="flex items-center space-x-1"
                      >
                        {copiedId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedId ? 'Copied!' : 'Copy'}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800">Verified Company</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <stat.icon className="w-6 h-6 text-blue-600" />
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
              {/* Recent Projects */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>Latest business service requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{job.service}</h4>
                            <p className="text-sm text-gray-600">Client: {job.client}</p>
                            <p className="text-sm text-gray-600">Provider: {job.provider}</p>
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Building className="w-4 h-4 mr-2" />
                      Company Settings
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Providers
                    </Button>
                    <Button variant="outline" className="w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Reports
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="providers">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Providers</CardTitle>
                <CardDescription>Your most successful service providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProviders.map((provider, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                          <p className="text-sm text-gray-600">{provider.jobs} jobs completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">KSh {provider.earnings.toLocaleString()}</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm text-gray-600">{provider.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet">
            <JitengeAccount />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;
