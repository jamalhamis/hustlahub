
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-red-600 to-green-600 text-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-lg mb-6 text-red-100">
          Join thousands of Kenyans who trust HustlaHub for their professional service needs
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
            <Link to="/register">Sign Up as Customer</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
            <Link to="/register">Join as Provider</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
