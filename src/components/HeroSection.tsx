
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Users } from "lucide-react";

interface HeroSectionProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

const HeroSection = ({ onOpenAuth }: HeroSectionProps) => {
  return (
    <section className="hero-gradient py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          {/* Animated Heart Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-8 animate-float">
            <Heart className="w-10 h-10 text-wynGreen-500 animate-bounce-gentle" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in-up">
            <span className="gradient-text floating-text">Where Love</span>
            <br />
            <span className="gradient-text floating-text">Meets Leftovers</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Transform restaurant remnants into precious meals for beloved pets. 
            <span className="text-wynOrange-600 font-semibold"> Join our community of caring pet parents and eco-conscious restaurants</span> making tails wag and hearts happy! 💛
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up">
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3">
              <Users className="w-5 h-5 text-wynGreen-500" />
              <span className="text-gray-700 font-medium">10,000+ Pet Lovers</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3">
              <MapPin className="w-5 h-5 text-wynOrange-500" />
              <span className="text-gray-700 font-medium">500+ Restaurants</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-700 font-medium">50,000+ Meals Shared</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Button 
              size="lg" 
              onClick={() => onOpenAuth('signup')}
              className="bg-gradient-to-r from-wynGreen-500 to-wynGreen-600 hover:from-wynGreen-600 hover:to-wynGreen-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🐕 Join as Pet Owner
            </Button>
            <Button 
              size="lg" 
              onClick={() => onOpenAuth('signup')}
              className="bg-gradient-to-r from-wynOrange-500 to-wynOrange-600 hover:from-wynOrange-600 hover:to-wynOrange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🍽️ Join as Restaurant
            </Button>
          </div>

          {/* Floating tagline */}
          <p className="text-gray-500 mt-8 animate-float">
            💚 Together, we create a world where no food goes to waste and every pet is loved 💚
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
