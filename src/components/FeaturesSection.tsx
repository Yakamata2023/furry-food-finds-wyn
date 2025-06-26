
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Heart, Shield, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-wynGreen-500" />,
      title: "Location-Based Matching",
      description: "Find restaurants and pet owners in your neighborhood for convenient food sharing."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Safe & Caring Community",
      description: "Verified users dedicated to pet welfare and reducing food waste with love."
    },
    {
      icon: <Shield className="w-8 h-8 text-wynOrange-500" />,
      title: "Food Safety Guidelines",
      description: "Clear guidelines and categories to ensure safe, appropriate food for every pet."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Community Impact",
      description: "Track your positive impact on the environment and local pet community."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="gradient-text">WYN Remnants</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We've built features that make food sharing safe, simple, and rewarding for everyone involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-br from-white to-gray-50"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-6 animate-bounce-gentle">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
