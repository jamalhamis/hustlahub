import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useVirtualList } from '@/hooks/useVirtualList';
import { 
  Search, 
  Star, 
  MapPin, 
  Briefcase,
  Laptop,
  FileText,
  Palette,
  Globe,
  Presentation,
  PenTool,
  GraduationCap,
  Calculator,
  DollarSign,
  Users,
  ClipboardList,
  Home,
  Car,
  Wrench,
  Book,
  Scissors,
  Hammer
} from 'lucide-react';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, []);

  const allServices = [
    {
      id: 1,
      name: 'KRA PIN Registration',
      provider: 'Legal Experts Ltd',
      price: 300,
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 156,
      location: 'Nairobi',
      icon: FileText,
      category: 'business-legal',
      description: 'Get your KRA PIN registration done quickly and efficiently'
    },
    {
      id: 2,
      name: 'KRA Tax Filing (Salaried)',
      provider: 'Tax Professionals',
      price: 500,
      priceType: 'Fixed',
      rating: 4.9,
      reviews: 203,
      location: 'Nairobi',
      icon: FileText,
      category: 'business-legal',
      description: 'Professional tax filing service for salaried employees'
    },
    {
      id: 3,
      name: 'KRA Tax Filing (Consultant/SME)',
      provider: 'Tax Professionals',
      price: '1,000 – 5,000',
      priceType: 'Range',
      rating: 4.7,
      reviews: 89,
      location: 'Nairobi',
      icon: FileText,
      category: 'business-legal',
      description: 'Comprehensive tax filing for consultants and SMEs'
    },
    {
      id: 4,
      name: 'Tax Compliance Certificate (TCC)',
      provider: 'Tax Professionals',
      price: 800,
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 134,
      location: 'Nairobi',
      icon: FileText,
      category: 'business-legal',
      description: 'Get your Tax Compliance Certificate processed'
    },
    {
      id: 5,
      name: 'NHIF/NSSF Registration',
      provider: 'Legal Experts Ltd',
      price: 300,
      priceType: 'Fixed',
      rating: 4.5,
      reviews: 98,
      location: 'Nairobi',
      icon: FileText,
      category: 'business-legal',
      description: 'Register for NHIF and NSSF benefits'
    },
    {
      id: 6,
      name: 'Business Name Registration',
      provider: 'Corporate Services',
      price: 1000,
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 89,
      location: 'Nairobi',
      icon: Briefcase,
      category: 'business-legal',
      description: 'Register your business name with relevant authorities'
    },
    {
      id: 7,
      name: 'Company Registration (Ltd, Partnership)',
      provider: 'Corporate Services',
      price: '2,000 – 6,000',
      priceType: 'Range',
      rating: 4.8,
      reviews: 156,
      location: 'Nairobi',
      icon: Briefcase,
      category: 'business-legal',
      description: 'Complete company registration services'
    },
    {
      id: 8,
      name: 'Trademark Search/Registration Support',
      provider: 'Legal Experts Ltd',
      price: '3,000 – 10,000+',
      priceType: 'Range',
      rating: 4.9,
      reviews: 203,
      location: 'Nairobi',
      icon: FileText,
      category: 'business-legal',
      description: 'Trademark search and registration assistance'
    },
    {
      id: 9,
      name: 'CR12/CR14 Requests',
      provider: 'Corporate Services',
      price: 800,
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 112,
      location: 'Nairobi',
      icon: FileText,
      category: 'business-legal',
      description: 'Corporate registry document requests'
    },
    {
      id: 10,
      name: 'Legal Document Drafting (Contract/NDA)',
      provider: 'Legal Experts Ltd',
      price: '1,500 – 10,000',
      priceType: 'Range',
      rating: 4.8,
      reviews: 145,
      location: 'Nairobi',
      icon: FileText,
      category: 'business-legal',
      description: 'Professional legal document drafting services'
    },
    {
      id: 11,
      name: 'CV Writing (Standard)',
      provider: 'Professional Writers',
      price: 800,
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 124,
      location: 'Nairobi',
      icon: FileText,
      category: 'digital-freelancing',
      description: 'Professional CV writing service'
    },
    {
      id: 12,
      name: 'Graphic Design (Logo, Poster, Branding)',
      provider: 'Creative Studio',
      price: '500 – 5,000+',
      priceType: 'Range',
      rating: 4.8,
      reviews: 198,
      location: 'Nairobi',
      icon: Palette,
      category: 'digital-freelancing',
      description: 'Professional graphic design services'
    },
    {
      id: 13,
      name: 'Social Media Setup (FB, IG, X)',
      provider: 'Digital Agency',
      price: 500,
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 87,
      location: 'Nairobi',
      icon: Globe,
      category: 'digital-freelancing',
      description: 'Complete social media account setup'
    },
    {
      id: 14,
      name: 'Social Media Management (Monthly)',
      provider: 'Digital Agency',
      price: '3,000 – 15,000',
      priceType: 'Range',
      rating: 4.9,
      reviews: 156,
      location: 'Nairobi',
      icon: Globe,
      category: 'digital-freelancing',
      description: 'Monthly social media management service'
    },
    {
      id: 15,
      name: 'Website Design (Business Site)',
      provider: 'Web Developers',
      price: '10,000 – 50,000+',
      priceType: 'Range',
      rating: 4.8,
      reviews: 234,
      location: 'Nairobi',
      icon: Laptop,
      category: 'digital-freelancing',
      description: 'Professional business website design'
    },
    {
      id: 16,
      name: 'Pitch Deck / Slide Design',
      provider: 'Creative Studio',
      price: '3,000 – 10,000',
      priceType: 'Range',
      rating: 4.7,
      reviews: 98,
      location: 'Nairobi',
      icon: Presentation,
      category: 'digital-freelancing',
      description: 'Professional pitch deck and presentation design'
    },
    {
      id: 17,
      name: 'Content Creation (Writing/Editing)',
      provider: 'Content Writers',
      price: '500 – 3,000+',
      priceType: 'Range',
      rating: 4.6,
      reviews: 145,
      location: 'Nairobi',
      icon: PenTool,
      category: 'digital-freelancing',
      description: 'Professional content writing and editing'
    },
    {
      id: 18,
      name: 'Academic Writing Support',
      provider: 'Academic Writers',
      price: '500 – 3,000+',
      priceType: 'Range',
      rating: 4.7,
      reviews: 167,
      location: 'Nairobi',
      icon: GraduationCap,
      category: 'digital-freelancing',
      description: 'Academic writing and research support'
    },
    {
      id: 19,
      name: 'Bookkeeping (Monthly)',
      provider: 'Finance Experts',
      price: '3,000 – 10,000',
      priceType: 'Range',
      rating: 4.8,
      reviews: 89,
      location: 'Nairobi',
      icon: Calculator,
      category: 'tax-finance-admin',
      description: 'Professional monthly bookkeeping services'
    },
    {
      id: 20,
      name: 'Payroll Setup / Management',
      provider: 'HR Solutions',
      price: '2,000 – 8,000',
      priceType: 'Range',
      rating: 4.7,
      reviews: 134,
      location: 'Nairobi',
      icon: DollarSign,
      category: 'tax-finance-admin',
      description: 'Complete payroll setup and management'
    },
    {
      id: 21,
      name: 'Business Proposal Writing',
      provider: 'Business Writers',
      price: '2,000 – 7,000',
      priceType: 'Range',
      rating: 4.6,
      reviews: 76,
      location: 'Nairobi',
      icon: FileText,
      category: 'tax-finance-admin',
      description: 'Professional business proposal writing'
    },
    {
      id: 22,
      name: 'Virtual Assistant Tasks',
      provider: 'VA Services',
      price: '500 – 3,000/day',
      priceType: 'Range',
      rating: 4.9,
      reviews: 203,
      location: 'Nairobi',
      icon: Users,
      category: 'tax-finance-admin',
      description: 'Comprehensive virtual assistant services'
    },
    {
      id: 23,
      name: 'Plumber',
      provider: 'Home Solutions',
      price: 999,
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 156,
      location: 'Nairobi',
      icon: Wrench,
      category: 'home-services',
      description: 'Professional plumbing services for your home'
    },
    {
      id: 24,
      name: 'Electrician',
      provider: 'Home Solutions',
      price: 1549,
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 203,
      location: 'Nairobi',
      icon: Wrench,
      category: 'home-services',
      description: 'Licensed electrical work and repairs'
    },
    {
      id: 25,
      name: 'House Painting',
      provider: 'Paint Experts',
      price: '199 per sq. meter',
      priceType: 'Range',
      rating: 4.6,
      reviews: 134,
      location: 'Nairobi',
      icon: Palette,
      category: 'home-services',
      description: 'Professional house painting services'
    },
    {
      id: 26,
      name: 'Cleaning (3-bedroom)',
      provider: 'Clean Masters',
      price: 499,
      priceType: 'Fixed',
      rating: 4.9,
      reviews: 289,
      location: 'Nairobi',
      icon: Home,
      category: 'home-services',
      description: 'Deep cleaning for 3-bedroom homes'
    },
    {
      id: 27,
      name: 'Roof Repairs',
      provider: 'Roof Experts',
      price: '1,199 per day',
      priceType: 'Range',
      rating: 4.7,
      reviews: 98,
      location: 'Nairobi',
      icon: Home,
      category: 'home-services',
      description: 'Professional roof repair services'
    },
    {
      id: 28,
      name: 'Tiles Repair',
      provider: 'Tile Masters',
      price: '149 per tile',
      priceType: 'Range',
      rating: 4.5,
      reviews: 67,
      location: 'Nairobi',
      icon: Home,
      category: 'home-services',
      description: 'Tile replacement and repair services'
    },
    {
      id: 29,
      name: 'Kitchen Sink Repairs',
      provider: 'Home Solutions',
      price: 699,
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 89,
      location: 'Nairobi',
      icon: Wrench,
      category: 'home-services',
      description: 'Kitchen sink repair and maintenance'
    },
    {
      id: 30,
      name: 'Door Repairs',
      provider: 'Home Solutions',
      price: 899,
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 123,
      location: 'Nairobi',
      icon: Home,
      category: 'home-services',
      description: 'Door repair and installation services'
    },
    {
      id: 31,
      name: 'Cabinet Repairs',
      provider: 'Wood Experts',
      price: '1,299 per day',
      priceType: 'Range',
      rating: 4.8,
      reviews: 145,
      location: 'Nairobi',
      icon: Hammer,
      category: 'home-services',
      description: 'Cabinet repair and refinishing'
    },
    {
      id: 32,
      name: 'Gardener',
      provider: 'Garden Masters',
      price: '500 per session',
      priceType: 'Range',
      rating: 4.9,
      reviews: 234,
      location: 'Nairobi',
      icon: Home,
      category: 'home-services',
      description: 'Professional gardening services'
    },
    {
      id: 33,
      name: 'Home Errands Worker',
      provider: 'Task Masters',
      price: '300 per task/hourly',
      priceType: 'Range',
      rating: 4.7,
      reviews: 167,
      location: 'Nairobi',
      icon: Users,
      category: 'home-services',
      description: 'General home tasks and errands'
    },
    {
      id: 34,
      name: 'Bed Repairs',
      provider: 'Furniture Experts',
      price: 599,
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 78,
      location: 'Nairobi',
      icon: Hammer,
      category: 'home-services',
      description: 'Bed frame repair and maintenance'
    },
    {
      id: 35,
      name: 'Car Wash + (Exterior only)',
      provider: 'Auto Care',
      price: 249,
      priceType: 'Fixed',
      rating: 4.5,
      reviews: 189,
      location: 'Nairobi',
      icon: Car,
      category: 'automotive-services',
      description: 'Exterior car wash service'
    },
    {
      id: 36,
      name: 'Car Wash ++ (Interior + Ext)',
      provider: 'Auto Care',
      price: 349,
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 234,
      location: 'Nairobi',
      icon: Car,
      category: 'automotive-services',
      description: 'Complete interior and exterior wash'
    },
    {
      id: 37,
      name: 'Car Wash +++ (Full + Engine)',
      provider: 'Auto Care',
      price: 849,
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 156,
      location: 'Nairobi',
      icon: Car,
      category: 'automotive-services',
      description: 'Full car wash including engine cleaning'
    },
    {
      id: 38,
      name: 'Car Detailing',
      provider: 'Detail Masters',
      price: 1999,
      priceType: 'Fixed',
      rating: 4.9,
      reviews: 123,
      location: 'Nairobi',
      icon: Car,
      category: 'automotive-services',
      description: 'Professional car detailing service'
    },
    {
      id: 39,
      name: 'Car Tyre Change',
      provider: 'Tyre Experts',
      price: 199,
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 267,
      location: 'Nairobi',
      icon: Car,
      category: 'automotive-services',
      description: 'Professional tyre changing service'
    },
    {
      id: 40,
      name: 'Car Service',
      provider: 'Auto Mechanics',
      price: 1099,
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 189,
      location: 'Nairobi',
      icon: Car,
      category: 'automotive-services',
      description: 'Complete car service and maintenance'
    },
    {
      id: 41,
      name: 'Jiko Repair (Jua Kali)',
      provider: 'Jua Kali Masters',
      price: 150,
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 89,
      location: 'Nairobi',
      icon: Wrench,
      category: 'repairs-maintenance',
      description: 'Traditional stove repair services'
    },
    {
      id: 42,
      name: 'Sufuria Repair (Jua Kali)',
      provider: 'Jua Kali Masters',
      price: 150,
      priceType: 'Fixed',
      rating: 4.5,
      reviews: 67,
      location: 'Nairobi',
      icon: Wrench,
      category: 'repairs-maintenance',
      description: 'Cooking pot repair services'
    },
    {
      id: 43,
      name: 'Knife Sharpening',
      provider: 'Sharp Masters',
      price: '20 per knife',
      priceType: 'Range',
      rating: 4.7,
      reviews: 234,
      location: 'Nairobi',
      icon: Wrench,
      category: 'repairs-maintenance',
      description: 'Professional knife sharpening'
    },
    {
      id: 44,
      name: 'Phone Repair (Screen)',
      provider: 'Tech Repair',
      price: 799,
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 345,
      location: 'Nairobi',
      icon: Laptop,
      category: 'repairs-maintenance',
      description: 'Mobile phone screen replacement'
    },
    {
      id: 45,
      name: 'Phone Repair (Motherboard)',
      provider: 'Tech Repair',
      price: 1099,
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 167,
      location: 'Nairobi',
      icon: Laptop,
      category: 'repairs-maintenance',
      description: 'Phone motherboard repair'
    },
    {
      id: 46,
      name: 'Phone Repair (Both)',
      provider: 'Tech Repair',
      price: 1499,
      priceType: 'Fixed',
      rating: 4.9,
      reviews: 123,
      location: 'Nairobi',
      icon: Laptop,
      category: 'repairs-maintenance',
      description: 'Complete phone repair service'
    },
    {
      id: 47,
      name: 'Printer Troubleshooting',
      provider: 'Tech Solutions',
      price: 1199,
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 89,
      location: 'Nairobi',
      icon: Laptop,
      category: 'repairs-maintenance',
      description: 'Printer repair and troubleshooting'
    },
    {
      id: 48,
      name: 'Laptop Repair (Screen)',
      provider: 'Tech Repair',
      price: 1099,
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 145,
      location: 'Nairobi',
      icon: Laptop,
      category: 'repairs-maintenance',
      description: 'Laptop screen replacement'
    },
    {
      id: 49,
      name: 'Laptop Repair (Motherboard)',
      provider: 'Tech Repair',
      price: 1999,
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 98,
      location: 'Nairobi',
      icon: Laptop,
      category: 'repairs-maintenance',
      description: 'Laptop motherboard repair'
    },
    {
      id: 50,
      name: 'Laptop Repair (Both Issues)',
      provider: 'Tech Repair',
      price: 2499,
      priceType: 'Fixed',
      rating: 4.9,
      reviews: 67,
      location: 'Nairobi',
      icon: Laptop,
      category: 'repairs-maintenance',
      description: 'Complete laptop repair service'
    },
    {
      id: 51,
      name: 'English (CBC Grade 1-6)',
      provider: 'Education Experts',
      price: '299/hour',
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 234,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Language skills, grammar, literacy tutoring'
    },
    {
      id: 52,
      name: 'Kiswahili (CBC Grade 1-6)',
      provider: 'Education Experts',
      price: '499/hour',
      priceType: 'Fixed',
      rating: 4.9,
      reviews: 189,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'National language, CBC aligned tutoring'
    },
    {
      id: 53,
      name: 'Mathematics (CBC Grade 1-6)',
      provider: 'Math Tutors',
      price: '499/hour',
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 267,
      location: 'Nairobi',
      icon: Calculator,
      category: 'education-services',
      description: 'Primary arithmetic and problem-solving'
    },
    {
      id: 54,
      name: 'Environmental Activities (CBC)',
      provider: 'Education Experts',
      price: '399/hour',
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 145,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Nature, safety, surroundings education'
    },
    {
      id: 55,
      name: 'Science & Technology (Grade 4-6)',
      provider: 'Science Tutors',
      price: '499/hour',
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 178,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Basic scientific concepts tutoring'
    },
    {
      id: 56,
      name: 'Social Studies (CBC)',
      provider: 'Education Experts',
      price: '399/hour',
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 123,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'History, civics, geography tutoring'
    },
    {
      id: 57,
      name: 'Religious Education (CRE, IRE, HRE)',
      provider: 'Faith Tutors',
      price: '399/hour',
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 89,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Faith-based studies tutoring'
    },
    {
      id: 58,
      name: 'Digital Literacy / ICT (CBC)',
      provider: 'Tech Tutors',
      price: '499/hour',
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 156,
      location: 'Nairobi',
      icon: Laptop,
      category: 'education-services',
      description: 'Computer basics, typing, MS Office'
    },
    {
      id: 59,
      name: 'Homework Supervision (CBC)',
      provider: 'Education Experts',
      price: '299/hour',
      priceType: 'Fixed',
      rating: 4.6,
      reviews: 234,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Help with general class assignments'
    },
    {
      id: 60,
      name: 'Exam Revision & Test Prep (CBC)',
      provider: 'Exam Experts',
      price: '499 – 999/hour',
      priceType: 'Range',
      rating: 4.9,
      reviews: 189,
      location: 'Nairobi',
      icon: GraduationCap,
      category: 'education-services',
      description: 'KCPE, KPSEA preparation'
    },
    {
      id: 61,
      name: 'English (Grade 7-9)',
      provider: 'Secondary Tutors',
      price: '599/hour',
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 167,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Composition, comprehension, grammar'
    },
    {
      id: 62,
      name: 'Mathematics (Grade 7-9)',
      provider: 'Math Experts',
      price: '599/hour',
      priceType: 'Fixed',
      rating: 4.9,
      reviews: 234,
      location: 'Nairobi',
      icon: Calculator,
      category: 'education-services',
      description: 'Algebra, geometry, problem-solving'
    },
    {
      id: 63,
      name: 'Integrated Science (Grade 7-9)',
      provider: 'Science Tutors',
      price: '599/hour',
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 145,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Biology, physics, chemistry basics'
    },
    {
      id: 64,
      name: 'Computer Studies / ICT (Grade 7-9)',
      provider: 'Tech Tutors',
      price: '599/hour',
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 123,
      location: 'Nairobi',
      icon: Laptop,
      category: 'education-services',
      description: 'Intermediate computing, coding, typing'
    },
    {
      id: 65,
      name: 'English (Grade 10-12)',
      provider: 'Senior Tutors',
      price: '749/hour',
      priceType: 'Fixed',
      rating: 4.9,
      reviews: 189,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Literature, composition, grammar'
    },
    {
      id: 66,
      name: 'Mathematics (Grade 10-12)',
      provider: 'Math Masters',
      price: '749/hour',
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 267,
      location: 'Nairobi',
      icon: Calculator,
      category: 'education-services',
      description: 'Pure, Applied, and Technical Math'
    },
    {
      id: 67,
      name: 'Biology (Grade 10-12)',
      provider: 'Science Masters',
      price: '749/hour',
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 156,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Human, plant, and ecological systems'
    },
    {
      id: 68,
      name: 'Chemistry (Grade 10-12)',
      provider: 'Science Masters',
      price: '749/hour',
      priceType: 'Fixed',
      rating: 4.7,
      reviews: 134,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Inorganic/organic/physical chemistry'
    },
    {
      id: 69,
      name: 'Physics (Grade 10-12)',
      provider: 'Science Masters',
      price: '749/hour',
      priceType: 'Fixed',
      rating: 4.8,
      reviews: 145,
      location: 'Nairobi',
      icon: Book,
      category: 'education-services',
      description: 'Motion, electricity, thermodynamics'
    },
    {
      id: 70,
      name: 'KCSE Exam Prep',
      provider: 'Exam Masters',
      price: '749 – 1,499/hour',
      priceType: 'Range',
      rating: 4.9,
      reviews: 234,
      location: 'Nairobi',
      icon: GraduationCap,
      category: 'education-services',
      description: 'KCSE or IGCSE preparation'
    },
    {
      id: 71,
      name: 'Tailor',
      provider: 'Fashion Experts',
      price: '300 – 1,500 per item',
      priceType: 'Range',
      rating: 4.7,
      reviews: 189,
      location: 'Nairobi',
      icon: Scissors,
      category: 'fashion-personal',
      description: 'Custom tailoring services'
    },
    {
      id: 72,
      name: 'Cobler (Shoe Repairs)',
      provider: 'Shoe Masters',
      price: '100 – 400 per pair',
      priceType: 'Range',
      rating: 4.6,
      reviews: 156,
      location: 'Nairobi',
      icon: Scissors,
      category: 'fashion-personal',
      description: 'Professional shoe repair services'
    }
  ];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleBookService = (service: any) => {
    if (service.priceType === 'Fixed') {
      alert(`Booking ${service.name} for KSh ${service.price}. You will be redirected to check wallet balance and payment.`);
    } else {
      alert(`Requesting quote for ${service.name} (${service.price}). Provider will send you a custom quote.`);
    }
  };

  const handleOfferService = (service: any) => {
    alert(`You are now offering ${service.name} service. Customers will be able to book this service from you.`);
  };

  return (
    <>
      <Helmet>
        <title>Professional Services in Kenya - Browse 1000+ Verified Providers | HustlaHub</title>
        <meta name="description" content="Browse professional services across Kenya. Business registration, legal services, home repairs, tutoring, digital services. Compare prices, read reviews, book instantly with secure payments." />
        <meta name="keywords" content="professional services Kenya, service providers, business services, legal services, home services, tutoring services, digital services, Nairobi services, Mombasa services" />
        <link rel="canonical" href="https://hustlahub.co.ke/services" />
        <meta property="og:title" content="Professional Services in Kenya - HustlaHub" />
        <meta property="og:description" content="Browse 1000+ verified professional service providers across Kenya" />
        <meta property="og:url" content="https://hustlahub.co.ke/services" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Professional Services</h1>
            <p className="text-gray-600">Find trusted professionals for all your service needs</p>
          </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search services..."
              className="pl-10 pr-4 py-3 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="mb-2"
            >
              All Services
            </Button>
            <Button
              variant={selectedCategory === 'business-legal' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('business-legal')}
              className="mb-2"
            >
              Business & Legal
            </Button>
            <Button
              variant={selectedCategory === 'digital-freelancing' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('digital-freelancing')}
              className="mb-2"
            >
              Digital & Freelancing
            </Button>
            <Button
              variant={selectedCategory === 'tax-finance-admin' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('tax-finance-admin')}
              className="mb-2"
            >
              Tax, Finance & Admin
            </Button>
            <Button
              variant={selectedCategory === 'home-services' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('home-services')}
              className="mb-2"
            >
              Home Services
            </Button>
            <Button
              variant={selectedCategory === 'automotive-services' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('automotive-services')}
              className="mb-2"
            >
              Automotive Services
            </Button>
            <Button
              variant={selectedCategory === 'repairs-maintenance' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('repairs-maintenance')}
              className="mb-2"
            >
              Repairs & Maintenance
            </Button>
            <Button
              variant={selectedCategory === 'education-services' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('education-services')}
              className="mb-2"
            >
              Education Services
            </Button>
            <Button
              variant={selectedCategory === 'fashion-personal' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('fashion-personal')}
              className="mb-2"
            >
              Fashion & Personal
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <Badge className={`${
                    service.priceType === 'Fixed' ? 'bg-green-600' : 'bg-blue-600'
                  } text-white`}>
                    {service.priceType}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-2">by {service.provider}</p>
                <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{service.location}</span>
                  <span className="mx-2">•</span>
                  <span>{service.reviews} reviews</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-red-600">
                      KSh {typeof service.price === 'number' ? service.price.toLocaleString() : service.price}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => handleBookService(service)}
                  >
                    {service.priceType === 'Fixed' ? 'Book Now' : 'Get Quote'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => handleOfferService(service)}
                  >
                    Offer This Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Services;
