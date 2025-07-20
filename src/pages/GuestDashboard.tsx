
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Star, 
  Heart,
  Clock,
  DollarSign,
  User,
  ArrowRight,
  Filter
} from 'lucide-react';

const GuestDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const featuredProviders = [
    {
      id: 1,
      name: 'John Mwangi',
      service: 'Professional Plumber',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 1500,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      location: 'Nairobi, Kenya',
      verified: true,
      responseTime: '2 hours',
      completedJobs: 145
    },
    {
      id: 2,
      name: 'Sarah Wanjiku',
      service: 'Interior Designer',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 2000,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      location: 'Westlands, Nairobi',
      verified: true,
      responseTime: '1 hour',
      completedJobs: 78
    },
    {
      id: 3,
      name: 'Peter Kimani',
      service: 'Electrical Technician',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 1200,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=peter',
      location: 'Kilimani, Nairobi',
      verified: true,
      responseTime: '3 hours',
      completedJobs: 203
    },
    {
      id: 4,
      name: 'Grace Mutiso',
      service: 'House Cleaning Expert',
      rating: 5.0,
      reviews: 94,
      hourlyRate: 800,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
      location: 'Karen, Nairobi',
      verified: true,
      responseTime: '30 min',
      completedJobs: 167
    }
  ];

  const serviceCategories = [
    { name: 'Plumbing', count: 245, trending: true },
    { name: 'Cleaning', count: 312, trending: false },
    { name: 'Electrical', count: 189, trending: true },
    { name: 'Tutoring', count: 278, trending: false },
    { name: 'Car Repair', count: 156, trending: true },
    { name: 'Interior Design', count: 95, trending: false }
  ];

  const testimonials = [
    {
      name: 'Alice Wanjiru',
      service: 'Plumbing',
      rating: 5,
      text: 'Found an amazing plumber through Jitenge. Quick response and professional work!'
    },
    {
      name: 'David Ochieng',
      service: 'House Cleaning',
      rating: 5,
      text: 'Excellent cleaning service. Very thorough and affordable pricing.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section for Guests */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Trusted Services
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Browse verified service providers without creating an account
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center">
              <Search className="text-gray-400 ml-3 mr-2" size={20} />
              <Input 
                placeholder="What service do you need?" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus-visible:ring-0 text-gray-900"
              />
            </div>
            <div className="flex-1 flex items-center">
              <MapPin className="text-gray-400 ml-3 mr-2" size={20} />
              <Input 
                placeholder="Your location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 focus-visible:ring-0 text-gray-900"
              />
            </div>
            <Button className="bg-red-600 hover:bg-red-700 px-8">
              <Filter className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-red-100 mb-4">Ready to book services?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Link to="/register">Sign Up Free <ArrowRight className="ml-2" size={20} /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
                <Link to="/login">Already have an account?</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Service Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} providers</p>
                  {category.trending && (
                    <Badge className="mt-2 bg-red-100 text-red-800">Trending</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Providers */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Top Rated Providers</h2>
            <Button variant="outline" asChild>
              <Link to="/register">View All Providers</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-600">{provider.service}</p>
                      {provider.verified && (
                        <Badge className="mt-1 bg-green-100 text-green-800 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold ml-1">{provider.rating}</span>
                        <span className="text-sm text-gray-600 ml-1">({provider.reviews})</span>
                      </div>
                      <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {provider.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      Responds in {provider.responseTime}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-1" />
                      {provider.completedJobs} jobs completed
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        KSh {provider.hourlyRate}
                      </span>
                      <span className="text-sm text-gray-600">/hour</span>
                    </div>
                    <Button size="sm" asChild>
                      <Link to="/register">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.service} Service</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 bg-gray-100 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join HustlaHub to book trusted services and connect with verified providers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link to="/register">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuestDashboard;
