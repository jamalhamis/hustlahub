
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Headphones, 
  MessageSquare, 
  Users, 
  AlertTriangle,
  Clock,
  CheckCircle,
  Search,
  Phone,
  Mail,
  FileText,
  Star,
  User,
  Activity
} from 'lucide-react';

const CustomerServiceDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('tickets');
  const [searchTerm, setSearchTerm] = useState('');

  const tickets = [
    {
      id: 'T001',
      customer: 'Alice Wanjiku',
      email: 'alice@example.com',
      subject: 'Payment not processed',
      priority: 'high',
      status: 'open',
      category: 'payment',
      created: '2024-01-25 10:30',
      lastUpdate: '2024-01-25 14:22'
    },
    {
      id: 'T002',
      customer: 'John Mwangi',
      email: 'john@example.com',
      subject: 'Cannot access provider dashboard',
      priority: 'medium',
      status: 'in-progress',
      category: 'technical',
      created: '2024-01-25 09:15',
      lastUpdate: '2024-01-25 11:45'
    },
    {
      id: 'T003',
      customer: 'Grace Mutua',
      email: 'grace@example.com',
      subject: 'Service quality complaint',
      priority: 'high',
      status: 'escalated',
      category: 'complaint',
      created: '2024-01-24 16:20',
      lastUpdate: '2024-01-25 08:30'
    }
  ];

  const users = [
    {
      id: 'U001',
      name: 'Peter Kimani',
      email: 'peter@example.com',
      role: 'provider',
      status: 'active',
      joinDate: '2024-01-15',
      totalJobs: 45,
      rating: 4.8,
      issues: 0
    },
    {
      id: 'U002',
      name: 'Sarah Njeri',
      email: 'sarah@example.com',
      role: 'customer',
      status: 'suspended',
      joinDate: '2024-01-10',
      totalOrders: 12,
      issues: 3
    },
    {
      id: 'U003',
      name: 'TechCorp Ltd',
      email: 'info@techcorp.co.ke',
      role: 'company',
      status: 'active',
      joinDate: '2024-01-01',
      totalProjects: 28,
      rating: 4.6,
      issues: 1
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Service Portal</h1>
            <p className="text-gray-600 mt-2">Support dashboard for customer assistance</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Live Chat
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-gray-600">Open Tickets</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-gray-600">Pending Response</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-gray-600">Resolved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-gray-600">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Support Tickets</CardTitle>
                    <CardDescription>Manage customer support requests</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button>New Ticket</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">#{ticket.id}</h4>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">{ticket.created}</span>
                      </div>
                      
                      <h5 className="font-medium text-gray-900 mb-2">{ticket.subject}</h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Customer: {ticket.customer}</p>
                          <p className="text-gray-600">Email: {ticket.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Category: {ticket.category}</p>
                          <p className="text-gray-600">Last Update: {ticket.lastUpdate}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
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

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage customer, provider, and company accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                            <User className="text-white w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Joined: {user.joinDate}</p>
                          <p className="text-gray-600">Issues: {user.issues}</p>
                        </div>
                        <div>
                          {user.totalJobs && <p className="text-gray-600">Jobs: {user.totalJobs}</p>}
                          {user.totalOrders && <p className="text-gray-600">Orders: {user.totalOrders}</p>}
                          {user.totalProjects && <p className="text-gray-600">Projects: {user.totalProjects}</p>}
                        </div>
                        <div>
                          {user.rating && (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span>{user.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                        {user.status === 'active' ? (
                          <Button size="sm" variant="outline" className="text-red-600">
                            Suspend
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints">
            <Card>
              <CardHeader>
                <CardTitle>Complaint Management</CardTitle>
                <CardDescription>Handle customer complaints and disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Complaints</h3>
                  <p className="text-gray-600">All complaints have been resolved.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refunds">
            <Card>
              <CardHeader>
                <CardTitle>Refund Management</CardTitle>
                <CardDescription>Process refund requests and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Refunds</h3>
                  <p className="text-gray-600">All refund requests have been processed.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Service Reports</CardTitle>
                <CardDescription>Generate customer service performance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Daily Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tickets Resolved</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Response Time</span>
                        <span className="font-semibold">4.2 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">4.8/5.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Generate Report</h4>
                    <div className="space-y-2">
                      <Label>Report Type</Label>
                      <select className="w-full p-2 border rounded">
                        <option>Daily Summary</option>
                        <option>Weekly Performance</option>
                        <option>Monthly Analytics</option>
                      </select>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
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

export default CustomerServiceDashboard;
