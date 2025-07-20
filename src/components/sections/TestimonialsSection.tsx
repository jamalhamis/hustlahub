
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Grace Wanjiku',
      location: 'Nairobi',
      rating: 5,
      text: 'Got my KRA PIN registration done quickly through HustlaHub. Professional service!'
    },
    {
      name: 'David Mutua',
      location: 'Mombasa',
      rating: 5,
      text: 'As a tax consultant, HustlaHub has helped me reach more clients efficiently.'
    },
    {
      name: 'Sarah Akinyi',
      location: 'Kisumu',
      rating: 5,
      text: 'The secure payment system gives me peace of mind when booking legal services.'
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What Our Users Say</h2>
          <p className="text-lg text-gray-600">Real experiences from our community</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-5">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-3 text-sm">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-600">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
