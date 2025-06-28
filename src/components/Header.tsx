import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

const Header = ({ onOpenAuth }: HeaderProps) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-wynGreen-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-wynGreen-500 to-wynOrange-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white animate-bounce-gentle" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">WYN</h1>
              <p className="text-xs text-gray-600 -mt-1">Remnants</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-700 hover:text-wynGreen-600 transition-colors">Features</a>
            <a href="/#how-it-works" className="text-gray-700 hover:text-wynGreen-600 transition-colors">How It Works</a>
            <a href="/#categories" className="text-gray-700 hover:text-wynGreen-600 transition-colors">Food Types</a>
            <Link to="/donate" className="text-wynOrange-600 hover:text-wynOrange-700 font-semibold transition-colors animate-bounce-gentle">
              💝 Donate
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/donate">
              <Button 
                className="bg-gradient-to-r from-wynOrange-500 to-red-500 hover:from-wynOrange-600 hover:to-red-600 text-white animate-bounce-gentle"
              >
                💝 Donate Now
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button 
                    variant="ghost" 
                    className="text-wynGreen-700 hover:text-wynGreen-800"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button 
                    className="bg-gradient-to-r from-wynGreen-500 to-wynOrange-500 hover:from-wynGreen-600 hover:to-wynOrange-600 text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
