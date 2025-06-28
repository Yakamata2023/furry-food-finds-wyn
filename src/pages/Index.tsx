
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import FoodCategories from "@/components/FoodCategories";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import RetractableMenu from "@/components/RetractableMenu";

const Index = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
  };

  const handleCloseAuth = () => {
    setAuthMode(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wynGreen-50 via-white to-wynOrange-50">
      <RetractableMenu />
      <Header onOpenAuth={handleOpenAuth} />
      
      <main>
        <section id="hero">
          <HeroSection onOpenAuth={handleOpenAuth} />
        </section>
        
        <section id="features">
          <FeaturesSection />
        </section>
        
        <section id="how-it-works">
          <HowItWorks />
        </section>
        
        <section id="categories">
          <FoodCategories />
        </section>
      </main>

      <Footer />

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={handleCloseAuth}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
};

export default Index;
