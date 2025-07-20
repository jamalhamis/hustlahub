import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

interface ServiceCardProps {
  id: number;
  name: string;
  provider: string;
  price: number | string;
  priceType: string;
  rating: number;
  reviews: number;
  location: string;
  icon: React.ComponentType<any>;
  category: string;
  description: string;
}

const ServiceCard = memo(({ 
  name, 
  provider, 
  price, 
  priceType, 
  rating, 
  reviews, 
  location, 
  icon: Icon, 
  description 
}: ServiceCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="font-medium">{provider}</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{rating}</span>
                  </div>
                  <span className="text-gray-500">({reviews} reviews)</span>
                  <Badge variant="secondary" className="ml-auto">
                    {priceType}
                  </Badge>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary mb-2">
                  KES {typeof price === 'number' ? price.toLocaleString() : price}
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" className="w-full">
                    Book Now
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Get Quote
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full">
                    Offer This Service
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;