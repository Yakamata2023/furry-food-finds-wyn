
import { Heart, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-wynGreen-500 to-wynOrange-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white animate-bounce-gentle" />
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">WYN Remnants</h3>
                <p className="text-sm text-gray-400">Connecting Hearts, Feeding Pets</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Creating a sustainable future where restaurants and pet owners work together to reduce waste while caring for our beloved animals.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Abuja, FCT, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-300 hover:text-wynGreen-400 transition-colors">Features</a></li>
              <li><a href="#categories" className="text-gray-300 hover:text-wynGreen-400 transition-colors">Food Categories</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-wynGreen-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wynGreen-400 transition-colors">Safety Guidelines</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-wynGreen-400" />
                <span className="text-gray-300">hello@wynremnants.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-wynOrange-400" />
                <span className="text-gray-300">+234 (0) 800-WYN-PETS</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <h5 className="font-semibold mb-3">Follow Our Journey</h5>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-wynGreen-600 transition-colors cursor-pointer">
                  <span className="text-sm">📱</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-wynOrange-600 transition-colors cursor-pointer">
                  <span className="text-sm">🐦</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">📘</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 WYN Tech. Made with ❤️ for pets and planet.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
