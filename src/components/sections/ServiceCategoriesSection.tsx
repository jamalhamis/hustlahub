
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Laptop, Calculator, Home, Car, Wrench, GraduationCap, Scissors } from 'lucide-react';

const ServiceCategoriesSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Service Categories</h2>
          <p className="text-lg text-gray-600 mb-6">Professional services with transparent pricing</p>
        </div>
        
        {/* Service Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Business & Legal Services */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/services?category=business-legal'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Business & Legal Services</h3>
              <p className="text-gray-600 mb-4">KRA registration, tax filing, company formation, legal documents, and more</p>
              <Button className="bg-red-600 hover:bg-red-700" asChild>
                <Link to="/services?category=business-legal">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Digital & Freelancing Services */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/services?category=digital-freelancing'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital & Freelancing Services</h3>
              <p className="text-gray-600 mb-4">CV writing, graphic design, website development, content creation, and more</p>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/services?category=digital-freelancing">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tax, Finance & Admin Support */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/services?category=tax-finance-admin'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tax, Finance & Admin Support</h3>
              <p className="text-gray-600 mb-4">Bookkeeping, payroll management, business proposals, virtual assistance</p>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link to="/services?category=tax-finance-admin">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Home Services */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/services?category=home-services'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Home Services</h3>
              <p className="text-gray-600 mb-4">Plumbing, electrical, cleaning, painting, gardening, and home repairs</p>
              <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                <Link to="/services?category=home-services">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Automotive Services */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/services?category=automotive-services'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Automotive Services</h3>
              <p className="text-gray-600 mb-4">Car wash, detailing, tyre change, car service, and maintenance</p>
              <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                <Link to="/services?category=automotive-services">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Repairs & Maintenance */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/services?category=repairs-maintenance'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Repairs & Maintenance</h3>
              <p className="text-gray-600 mb-4">Phone repair, laptop repair, appliance repair, and technical services</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
                <Link to="/services?category=repairs-maintenance">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Education Services */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/services?category=education-services'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Education Services</h3>
              <p className="text-gray-600 mb-4">Home tutoring for CBC, Junior Secondary, Senior Secondary subjects</p>
              <Button className="bg-yellow-600 hover:bg-yellow-700" asChild>
                <Link to="/services?category=education-services">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Fashion & Personal Items */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/services?category=fashion-personal'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fashion & Personal Items</h3>
              <p className="text-gray-600 mb-4">Tailoring services and shoe repairs for all your fashion needs</p>
              <Button className="bg-pink-600 hover:bg-pink-700" asChild>
                <Link to="/services?category=fashion-personal">View Services</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoriesSection;
