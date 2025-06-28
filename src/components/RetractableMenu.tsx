
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Heart, Info, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const RetractableMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Home", icon: Home, path: "/" },
    { title: "Donate", icon: Heart, path: "/donate" },
    { title: "About", icon: Info, path: "/about" },
    { title: "Contact", icon: Mail, path: "/contact" },
  ];

  return (
    <div className="fixed top-4 left-4 z-50">
      {/* Menu Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-wynGreen-500 to-wynOrange-500 hover:from-wynGreen-600 hover:to-wynOrange-600 text-white shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Retractable Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] animate-in slide-in-from-top-2 duration-200">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-wynGreen-50 hover:text-wynGreen-600 transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RetractableMenu;
