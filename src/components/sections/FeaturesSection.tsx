
import React from 'react';
import { Shield, Star, Clock, Users } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your money is safe with our Jitenge Token escrow system'
    },
    {
      icon: Star,
      title: 'Verified Providers',
      description: 'All service providers are background-checked and rated'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our support team'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built for Kenyans, by Kenyans to strengthen our communities'
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Why Choose HustlaHub?</h2>
          <p className="text-lg text-gray-600">Built with trust and security at the core</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
