
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-red-600 via-red-700 to-green-600 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="text-center">
          {/* HustlaHub Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/4134c5f1-69c8-4bf1-9405-46a39964d6cc.png" 
              alt="HustlaHub Logo" 
              className="h-16 w-auto"
            />
          </div>
          
          {/* Moving Text Animation */}
          <div className="mb-4 h-12 flex items-center justify-center">
            <div className="text-2xl md:text-4xl font-bold">
              <span className="block animate-pulse">Professional Services</span>
              <span className="block text-yellow-300 animate-bounce">Trusted Experts</span>
            </div>
          </div>
          
          <p className="text-base md:text-lg mb-4 text-red-100 max-w-2xl mx-auto">
            Connect with verified professionals for business, legal, digital, and financial services. 
            From KRA registration to website design - we've got you covered.
          </p>
          
          {/* Functional Search Bar */}
          <div className="max-w-xl mx-auto bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2 mb-4">
            <div className="flex-1 flex items-center">
              <Search className="text-gray-400 ml-3 mr-2" size={20} />
              <Input 
                placeholder="Search services..." 
                className="border-0 focus-visible:ring-0 text-gray-900"
                id="service-search"
              />
            </div>
            <div className="flex-1 flex items-center">
              <MapPin className="text-gray-400 ml-3 mr-2" size={20} />
              <Input 
                placeholder="Your location" 
                className="border-0 focus-visible:ring-0 text-gray-900"
              />
            </div>
            <Button 
              className="bg-red-600 hover:bg-red-700 px-6"
              onClick={() => {
                const searchInput = document.getElementById('service-search') as HTMLInputElement;
                const searchTerm = searchInput?.value;
                if (searchTerm) {
                  window.location.href = `/services?search=${encodeURIComponent(searchTerm)}`;
                } else {
                  window.location.href = '/services';
                }
              }}
            >
              Search
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Link to="/register">Get Started <ArrowRight className="ml-2" size={20} /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
              <Link to="/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
