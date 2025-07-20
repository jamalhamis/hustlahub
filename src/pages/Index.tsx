
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/sections/HeroSection';
import ServiceCategoriesSection from '@/components/sections/ServiceCategoriesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>HustlaHub - Kenya's #1 Professional Services Marketplace | 10,000+ Verified Providers</title>
        <meta name="description" content="Find trusted service providers across Kenya. Business registration, legal services, home repairs, tutoring, digital services & more. Secure Jitenge Token payments. Book instantly!" />
        <meta name="keywords" content="Kenya professional services, service providers Kenya, business registration Kenya, KRA PIN registration, legal services Nairobi, home services Kenya, tutoring Kenya, digital services" />
        <link rel="canonical" href="https://hustlahub.co.ke" />
        
        {/* Structured Data for Homepage */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "HustlaHub",
          "alternateName": "HustlaHub Services",
          "url": "https://hustlahub.co.ke",
          "logo": "https://hustlahub.co.ke/logo.png",
          "description": "Kenya's leading marketplace for professional services",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "KE",
            "addressLocality": "Nairobi"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+254-700-123-456",
            "contactType": "customer service",
            "areaServed": "KE",
            "availableLanguage": ["English", "Swahili"]
          },
          "sameAs": [
            "https://facebook.com/hustlahub",
            "https://twitter.com/hustlahub_ke",
            "https://linkedin.com/company/hustlahub"
          ],
          "serviceType": [
            "Business Registration Services",
            "Legal Documentation Services",
            "Home Maintenance Services",
            "Educational Tutoring Services",
            "Digital Marketing Services",
            "Financial Advisory Services"
          ],
          "areaServed": {
            "@type": "Country",
            "name": "Kenya"
          }
        })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <HeroSection />
        <ServiceCategoriesSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
};

export default Index;
