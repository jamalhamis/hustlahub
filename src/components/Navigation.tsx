
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  User, 
  LogOut, 
  Home,
  Settings,
  MessageSquare,
  Shield,
  Headphones
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getDashboardRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'provider': return '/provider';
      case 'company': return '/company';
      case 'customer': return '/customer';
      default: return '/';
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/4134c5f1-69c8-4bf1-9405-46a39964d6cc.png" 
                alt="HustlaHub Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-gray-900">HustlaHub</span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-8">
              {user && (
                <Link 
                  to={getDashboardRoute()} 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(getDashboardRoute()) 
                      ? 'text-red-600 bg-red-50' 
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              )}
              
              <Link 
                to="/services" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/services') 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                }`}
              >
                Services
              </Link>
              
              {user && user.role !== 'guest' && (
                <Link 
                  to="/messages" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/messages') 
                      ? 'text-red-600 bg-red-50' 
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Admin and CS Portal Links */}
            {!user && (
              <div className="hidden md:flex items-center space-x-2">
                <Link 
                  to="/admin-login" 
                  className="flex items-center text-sm text-gray-600 hover:text-red-600"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Admin
                </Link>
                <Link 
                  to="/customer-service-login" 
                  className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                >
                  <Headphones className="w-4 h-4 mr-1" />
                  Support
                </Link>
              </div>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden md:block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-4">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
