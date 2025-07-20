
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { lazy, Suspense, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

// Lazy load components for code splitting
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const CustomerServiceLogin = lazy(() => import("./pages/CustomerServiceLogin"));
const Register = lazy(() => import("./pages/Register"));
const Services = lazy(() => import("./pages/Services"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const ProviderDashboard = lazy(() => import("./pages/ProviderDashboard"));
const CompanyDashboard = lazy(() => import("./pages/CompanyDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CustomerServiceDashboard = lazy(() => import("./pages/CustomerServiceDashboard"));
const GuestDashboard = lazy(() => import("./pages/GuestDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized QueryClient for high performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 2,
    },
  },
});

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

// Auth-aware routing component
const AuthAwareRoutes = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && user && location.pathname === '/') {
      // Redirect authenticated users to their dashboard
      switch (user.role) {
        case 'admin': navigate('/admin'); break;
        case 'provider': navigate('/provider'); break;
        case 'company': navigate('/company'); break;
        case 'customer': navigate('/customer'); break;
        default: navigate('/');
      }
    }
  }, [user, isLoading, navigate, location.pathname]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/customer-service-login" element={<CustomerServiceLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Guest Dashboard - no auth required */}
      <Route path="/guest" element={<GuestDashboard />} />
      
      {/* Customer Service Dashboard */}
      <Route path="/customer-service" element={<CustomerServiceDashboard />} />
      
      {/* Profile - requires authentication */}
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={['customer', 'provider', 'company', 'admin']}>
          <Profile />
        </ProtectedRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/customer" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/provider" element={
        <ProtectedRoute allowedRoles={['provider']}>
          <ProviderDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/company" element={
        <ProtectedRoute allowedRoles={['company']}>
          <CompanyDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Suspense fallback={<LoadingSpinner />}>
                  <AuthAwareRoutes />
                </Suspense>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
