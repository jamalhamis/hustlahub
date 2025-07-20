/*
  # Initial Schema Setup for HustlaHub

  1. New Tables
    - `user_profiles` - Extended user information
    - `services` - Service listings
    - `bookings` - Service bookings
    - `jitenge_accounts` - Digital wallet accounts
    - `transactions` - Financial transactions
    - `reviews` - Service reviews
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    unique_id VARCHAR(50) UNIQUE NOT NULL DEFAULT ('USR-' || substr(gen_random_uuid()::text, 1, 8)),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL DEFAULT 'customer', -- 'customer', 'provider', 'company', 'admin'
    avatar TEXT,
    location VARCHAR(255),
    id_number VARCHAR(20),
    kra_pin VARCHAR(20),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    max_price DECIMAL(10,2), -- for range pricing
    price_type VARCHAR(20) DEFAULT 'Fixed', -- 'Fixed' or 'Range'
    provider_id UUID REFERENCES public.user_profiles(id),
    description TEXT,
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_id UUID REFERENCES public.services(id),
    customer_id UUID REFERENCES public.user_profiles(id),
    provider_id UUID REFERENCES public.user_profiles(id),
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'
    amount DECIMAL(10,2) NOT NULL,
    location VARCHAR(255),
    scheduled_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Jitenge Accounts table
CREATE TABLE IF NOT EXISTS public.jitenge_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) UNIQUE,
    balance DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    from_user_id UUID REFERENCES public.user_profiles(id),
    to_user_id UUID REFERENCES public.user_profiles(id),
    amount DECIMAL(10,2) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL, -- 'payment', 'deposit', 'withdrawal', 'transfer'
    status VARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'Completed', 'Failed'
    description TEXT,
    booking_id UUID REFERENCES public.bookings(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES public.bookings(id),
    customer_id UUID REFERENCES public.user_profiles(id),
    provider_id UUID REFERENCES public.user_profiles(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'booking', 'payment', 'system'
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jitenge_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- User profiles: users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Services: providers can manage their services, everyone can view active services
CREATE POLICY "Anyone can view active services" ON public.services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Providers can manage own services" ON public.services
    FOR ALL USING (auth.uid() = provider_id);

-- Bookings: customers and providers can see their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
    FOR SELECT USING (auth.uid() = customer_id OR auth.uid() = provider_id);

CREATE POLICY "Customers can create bookings" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update own bookings" ON public.bookings
    FOR UPDATE USING (auth.uid() = customer_id OR auth.uid() = provider_id);

-- Jitenge accounts: users can only see their own account
CREATE POLICY "Users can view own jitenge account" ON public.jitenge_accounts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own jitenge account" ON public.jitenge_accounts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own jitenge account" ON public.jitenge_accounts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Transactions: users can see transactions they're involved in
CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

-- Reviews: users can see reviews they wrote or received
CREATE POLICY "Users can view relevant reviews" ON public.reviews
    FOR SELECT USING (auth.uid() = customer_id OR auth.uid() = provider_id);

CREATE POLICY "Customers can create reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Notifications: users can only see their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_provider ON public.services(provider_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_provider ON public.bookings(provider_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_jitenge_accounts_user ON public.jitenge_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_from_user ON public.transactions(from_user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_to_user ON public.transactions(to_user_id);

-- Insert sample data
INSERT INTO public.services (name, category, subcategory, price, price_type, description, location) VALUES
('KRA PIN Registration', 'business-legal', 'tax-services', 300.00, 'Fixed', 'Professional KRA PIN registration service', 'Nairobi'),
('Business Name Registration', 'business-legal', 'company-formation', 1000.00, 'Fixed', 'Register your business name with relevant authorities', 'Nairobi'),
('Website Design', 'digital-freelancing', 'web-development', 15000.00, 'Fixed', 'Professional business website design', 'Nairobi'),
('House Cleaning', 'home-services', 'cleaning', 500.00, 'Fixed', 'Professional house cleaning service', 'Nairobi'),
('Car Wash', 'automotive-services', 'car-care', 300.00, 'Fixed', 'Complete car washing service', 'Nairobi'),
('Mathematics Tutoring', 'education-services', 'tutoring', 500.00, 'Fixed', 'Professional math tutoring for students', 'Nairobi');