
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Home, ArrowLeft } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-green-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <Shield className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Unauthorized Access</h2>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please check your account type or contact support if you believe this is an error.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
