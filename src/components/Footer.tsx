
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/4134c5f1-69c8-4bf1-9405-46a39964d6cc.png" 
                alt="HustlaHub Logo" 
                className="h-12 w-auto mr-3"
              />
              <span className="text-xl font-bold">HustlaHub</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Connecting Kenyans with trusted professional service providers. 
              Your secure platform for business, legal, and digital services.
            </p>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/consumer-protection" className="hover:text-white">Consumer Rights</a></li>
              <li><a href="/dispute-resolution" className="hover:text-white">Dispute Resolution</a></li>
              <li><a href="/data-protection" className="hover:text-white">Data Protection</a></li>
            </ul>
          </div>

          {/* Support Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support Contacts</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <h4 className="text-white font-medium mb-1">Customers/Users</h4>
                <p>Email: support@hustlahub.co.ke</p>
                <p>Phone: +254 700 123 456</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Service Providers</h4>
                <p>Email: providers@hustlahub.co.ke</p>
                <p>Phone: +254 700 234 567</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Companies</h4>
                <p>Email: business@hustlahub.co.ke</p>
                <p>Phone: +254 700 345 678</p>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="mb-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-yellow-400 text-xs font-medium mb-2">⚠️ IMPORTANT PRICING NOTICE</p>
            <p className="text-gray-300 text-xs">
              All service prices listed on this platform are strictly for labour charges only. 
              Any materials, supplies, or additional resources required for service provision will incur separate charges to be agreed upon with the service provider.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs mb-4 md:mb-0">
              © 2024 HustlaHub. All rights reserved. | Secure payments powered by Jitenge Token System
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-xs">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
