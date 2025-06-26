
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, User, Building2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const [userType, setUserType] = useState<'pet-owner' | 'restaurant' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would integrate with Supabase for authentication
    console.log('Auth form submitted:', { mode, userType, formData });
    // For now, just close the modal
    onClose();
  };

  const resetForm = () => {
    setUserType(null);
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="w-6 h-6 text-wynGreen-500" />
              <span className="gradient-text">
                {mode === 'login' ? 'Welcome Back!' : 'Join WYN Remnants'}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {mode === 'signup' && !userType ? (
          // User Type Selection
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-6">
              How would you like to help our community?
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-wynGreen-300"
                onClick={() => setUserType('pet-owner')}
              >
                <CardContent className="p-6 text-center">
                  <User className="w-12 h-12 text-wynGreen-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Pet Owner</h3>
                  <p className="text-sm text-gray-600">Find food remnants for your beloved pets</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-wynOrange-300"
                onClick={() => setUserType('restaurant')}
              >
                <CardContent className="p-6 text-center">
                  <Building2 className="w-12 h-12 text-wynOrange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Restaurant</h3>
                  <p className="text-sm text-gray-600">Share your food remnants with pet owners</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Auth Form
          <form onSubmit={handleSubmit} className="space-y-4">
            {userType && (
              <div className="text-center mb-4">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  userType === 'pet-owner' ? 'bg-wynGreen-100 text-wynGreen-700' : 'bg-wynOrange-100 text-wynOrange-700'
                }`}>
                  {userType === 'pet-owner' ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {userType === 'pet-owner' ? 'Pet Owner' : 'Restaurant'}
                  </span>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>
            )}

            <Button 
              type="submit" 
              className={`w-full ${
                userType === 'restaurant' 
                  ? 'bg-gradient-to-r from-wynOrange-500 to-wynOrange-600 hover:from-wynOrange-600 hover:to-wynOrange-700' 
                  : 'bg-gradient-to-r from-wynGreen-500 to-wynGreen-600 hover:from-wynGreen-600 hover:to-wynGreen-700'
              } text-white`}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>

            {/* Google Sign In Placeholder */}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => console.log('Google sign in')}
            >
              <span className="mr-2">🔍</span>
              Sign {mode === 'login' ? 'in' : 'up'} with Google
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
                className="text-sm text-wynGreen-600 hover:text-wynGreen-700"
              >
                {mode === 'login' 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'
                }
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
