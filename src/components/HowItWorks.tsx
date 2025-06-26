
import { Card, CardContent } from "@/components/ui/card";
import { Users, Search, MapPin, Heart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Users className="w-8 h-8 text-wynGreen-500" />,
      title: "Sign Up",
      description: "Create your account as a pet owner or restaurant",
      number: "1"
    },
    {
      icon: <Search className="w-8 h-8 text-wynOrange-500" />,
      title: "Browse & Post",
      description: "Find food remnants or post available items",
      number: "2"
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Connect Locally",
      description: "Match with nearby restaurants or pet owners",
      number: "3"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Share & Care",
      description: "Exchange food safely and spread the love",
      number: "4"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How <span className="gradient-text">WYN Remnants</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to start making a difference in your community today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8 text-center">
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-6 animate-bounce-gentle">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-wynGreen-500 to-wynOrange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-wynGreen-300 to-wynOrange-300 transform -translate-y-1/2 z-10"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-wynGreen-100 to-wynOrange-100 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 floating-text">
              Ready to Make a Difference? 🌟
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of caring individuals who are already making their communities better, one meal at a time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white rounded-full px-6 py-2 text-sm font-medium text-wynGreen-700">Zero Food Waste</span>
              <span className="bg-white rounded-full px-6 py-2 text-sm font-medium text-wynOrange-700">Happy Pets</span>
              <span className="bg-white rounded-full px-6 py-2 text-sm font-medium text-blue-700">Stronger Community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
