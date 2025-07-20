
import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">How It Works</h2>
          <p className="text-lg text-gray-600">Get your services completed in simple steps</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Service</h3>
            <p className="text-gray-600 text-sm">Select from our range of business, legal, and digital services with transparent pricing</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect & Book</h3>
            <p className="text-gray-600 text-sm">Connect with verified professionals and book your service</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pay Securely</h3>
            <p className="text-gray-600 text-sm">Pay safely with M-Pesa through our secure Jitenge Token system</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
