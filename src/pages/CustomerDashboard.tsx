import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Wallet,
  History,
  Heart,
  Filter,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import JitengeAccount from '@/components/JitengeAccount';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const recentBookings = [
    {
      id: 1,
      service: 'Plumbing Repair',
      provider: 'John Mwangi',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'completed',
      rating: 5,
      amount: 500
    },
    {
      id: 2,
      service: 'House Cleaning',
      provider: 'Mary Njeri',
      date: '2024-01-20',
      time: '2:00 PM',
      status: 'upcoming',
      amount: 800
    },
    {
      id: 3,
      service: 'Car Repair',
      provider: 'Peter Kimani',
      date: '2024-01-12',
      time: '9:00 AM',
      status: 'completed',
      rating: 4,
      amount: 1500
    }
  ];

  const topProviders = [
    {
      id: 1,
      name: 'Sarah Wanjiku',
      service: 'Interior Design',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 1500,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      location: 'Westlands, Nairobi'
    },
    {
      id: 2,
      name: 'James Ochieng',
      service: 'Electrical Work',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 600,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      location: 'Kilimani, Nairobi'
    },
    {
      id: 3,
      name: 'Grace Mutiso',
      service: 'Tutoring',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 400,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
      location: 'Karen, Nairobi'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your services and Jitenge account</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-gray-600">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-gray-600">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                  <p className="text-gray-600">Avg Rating Given</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wallet className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">KSh 12,500</p>
                  <p className="text-gray-600">Jitenge Balance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="account">Jitenge Account</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        placeholder="Search for services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <Input placeholder="Location" className="pl-10" />
                    </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Rated Providers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Rated Providers Near You</CardTitle>
                <CardDescription>Highly recommended service providers in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topProviders.map((provider) => (
                    <Card key={provider.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{provider.name}</h4>
                            <p className="text-sm text-gray-600">{provider.service}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm ml-1">
                              {provider.rating} ({provider.reviews})
                            </span>
                          </div>
                          <p className="text-sm font-semibold">KSh {provider.hourlyRate}/hr</p>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{provider.location}</p>
                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <JitengeAccount />
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Bookings
                  <Button variant="ghost" size="sm">
                    <History className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{booking.service}</h4>
                        <p className="text-sm text-gray-600">with {booking.provider}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {booking.date} at {booking.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          KSh {booking.amount.toLocaleString()}
                        </p>
                        {booking.rating && (
                          <div className="flex items-center mt-1">
                            {[...Array(booking.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
