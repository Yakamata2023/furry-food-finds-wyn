
import RetractableMenu from "@/components/RetractableMenu";
import Header from "@/components/Header";  
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wynGreen-50 via-white to-wynOrange-50">
      <RetractableMenu />
      <Header onOpenAuth={() => {}} />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              <span className="gradient-text">Contact Us</span>
            </h1>
            <p className="text-xl text-gray-600">
              Coming soon - Get in touch with the WYN Remnants team.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
