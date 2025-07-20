
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Shield,
  BarChart3,
  Settings,
  FileText,
  UserCheck,
  Ban,
  Eye,
  MessageSquare,
  Star,
  Calendar,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  const platformStats = {
    totalUsers: 12450,
    activeProviders: 3200,
    totalRevenue: 2450000,
    thisMonth: 340000,
    completedJobs: 18750,
    pendingDisputes: 12,
    avgRating: 4.6,
    commissionEarned: 367500
  };

  const recentUsers = [
    {
      id: 1,
      name: 'Alice Wanjiku',
      email: 'alice@example.com',
      role: 'customer',
      joinDate: '2024-01-20',
      status: 'active',
      verification: 'verified'
    },
    {
      id: 2,
      name: 'John Mwangi',
      email: 'john@example.com',
      role: 'provider',
      joinDate: '2024-01-18',
      status: 'active',
      verification: 'pending'
    },
    {
      id: 3,
      name: 'TechCorp Ltd',
      email: 'info@techcorp.co.ke',
      role: 'company',
      joinDate: '2024-01-15',
      status: 'suspended',
      verification: 'verified'
    }
  ];

  const disputes = [
    {
      id: 1,
      customer: 'Grace Mutua',
      provider: 'Peter Kimani',
      service: 'Plumbing Repair',
      amount: 3500,
      reason: 'Service not completed',
      status: 'pending',
      date: '2024-01-25'
    },
    {
      id: 2,
      customer: 'David Ochieng',
      provider: 'Mary Njeri',
      service: 'House Cleaning',
      amount: 2000,
      reason: 'Poor quality work',
      status: 'investigating',
      date: '2024-01-24'
    }
  ];

  const fraudAlerts = [
    {
      id: 1,
      type: 'Fake Reviews',
      target: 'Sarah Provider',
      severity: 'high',
      description: 'Multiple reviews from same IP address',
      date: '2024-01-25'
    },
    {
      id: 2,
      type: 'Payment Fraud',
      target: 'John Customer',
      severity: 'critical',
      description: 'Chargeback pattern detected',
      date: '2024-01-24'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'verified': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Platform overview and management</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
                  <p className="text-gray-600">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">KSh {platformStats.totalRevenue.toLocaleString()}</p>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{platformStats.completedJobs.toLocaleString()}</p>
                  <p className="text-gray-600">Completed Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{platformStats.pendingDisputes}</p>
                  <p className="text-gray-600">Pending Disputes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Alert</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Platform Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-green-800">New Provider Registered</p>
                        <p className="text-sm text-green-600">Sarah Electrician joined</p>
                      </div>
                      <span className="text-xs text-green-600">2 min ago</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-blue-800">Job Completed</p>
                        <p className="text-sm text-blue-600">Plumbing service in Nairobi</p>
                      </div>
                      <span className="text-xs text-blue-600">5 min ago</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-yellow-800">Dispute Raised</p>
                        <p className="text-sm text-yellow-600">Quality issue reported</p>
                      </div>
                      <span className="text-xs text-yellow-600">1 hour ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col items-center justify-center">
                      <UserCheck className="w-6 h-6 mb-2" />
                      Verify Provider
                    </Button>
                    <Button className="h-20 flex flex-col items-center justify-center" variant="outline">
                      <MessageSquare className="w-6 h-6 mb-2" />
                      View Messages
                    </Button>
                    <Button className="h-20 flex flex-col items-center justify-center" variant="outline">
                      <BarChart3 className="w-6 h-6 mb-2" />
                      Generate Report
                    </Button>
                    <Button className="h-20 flex flex-col items-center justify-center" variant="outline">
                      <Settings className="w-6 h-6 mb-2" />
                      System Config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and their verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="outline">{user.role}</Badge>
                            <Badge className={getStatusColor(user.verification)}>
                              {user.verification}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          Joined {user.joinDate}
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {user.status === 'active' ? (
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Ban className="w-4 h-4 mr-1" />
                              Suspend
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <UserCheck className="w-4 h-4 mr-1" />
                              Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Management</CardTitle>
                <CardDescription>Review and resolve customer-provider disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputes.map((dispute) => (
                    <div key={dispute.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">Dispute #{dispute.id}</h4>
                        <Badge className={getStatusColor(dispute.status)}>
                          {dispute.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Service: {dispute.service}</p>
                          <p className="text-sm text-gray-600">Customer: {dispute.customer}</p>
                          <p className="text-sm text-gray-600">Provider: {dispute.provider}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Amount: KSh {dispute.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Date: {dispute.date}</p>
                          <p className="text-sm text-gray-600">Reason: {dispute.reason}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          View Chat
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fraud">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>Monitor and investigate suspicious activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudAlerts.map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4 border-red-200 bg-red-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <h4 className="font-semibold text-red-900">{alert.type}</h4>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-red-800">Target: {alert.target}</p>
                        <p className="text-sm text-red-700">{alert.description}</p>
                        <p className="text-xs text-red-600 mt-1">Detected on {alert.date}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark False Positive
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Ban className="w-4 h-4 mr-1" />
                          Suspend Account
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">New Users (This Month)</span>
                      <span className="font-semibold text-green-600">+1,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">New Providers</span>
                      <span className="font-semibold text-green-600">+340</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Jobs Completed</span>
                      <span className="font-semibold text-blue-600">2,150</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Commission Earned</span>
                      <span className="font-semibold">KSh {platformStats.commissionEarned.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Plumbing</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cleaning</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Electrical</span>
                      <span className="font-semibold">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tutoring</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Others</span>
                      <span className="font-semibold">22%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
