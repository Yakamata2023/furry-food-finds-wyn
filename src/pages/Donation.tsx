
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetractableMenu from "@/components/RetractableMenu";
import { Heart, PawPrint, Shield } from "lucide-react";
import { Banknote } from "lucide-react";

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    email: "",
    name: "",
    phone: ""
  });
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const donationMessages = [
    "Save hungry pets with ₦1,000 today",
    "Your donation rescues abandoned animals daily", 
    "Feed starving pets, donate now please",
    "Homeless pets starve without your help",
    "One donation saves countless furry lives"
  ];

  // Cycle through messages every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        (prevIndex + 1) % donationMessages.length
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [donationMessages.length]);

  const predefinedAmounts = [1000, 2000, 3000, 4000, 5000, 6000];

  const handlePaystackPayment = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      alert("Please select or enter a valid donation amount");
      return;
    }

    // Initialize Paystack payment
    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_your_paystack_public_key', // Replace with your Paystack public key
      email: donorInfo.email || 'anonymous@wynremnants.com',
      amount: amount * 100, // Paystack expects amount in kobo
      currency: 'NGN',
      ref: 'WYN_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: donorInfo.name || "Anonymous"
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: donorInfo.phone || "Not provided"
          }
        ]
      },
      callback: function(response: any) {
        alert('Payment successful! Transaction ref: ' + response.reference);
        console.log('Payment successful:', response);
      },
      onClose: function() {
        alert('Payment window closed');
      }
    });
    
    handler.openIframe();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wynGreen-50 via-white to-wynOrange-50">
      <RetractableMenu />
      <Header onOpenAuth={() => {}} />
      
      {/* Starry Background for Floating Messages */}
      <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none">
        <div className="relative bg-black bg-opacity-90 py-4 overflow-hidden">
          {/* Twinkling Stars */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Floating Message */}
          <div className="container mx-auto px-4 text-center relative z-10">
            <div
              key={currentMessageIndex}
              className="floating-text text-lg font-bold text-white animate-bounce-gentle"
            >
              💝 {donationMessages[currentMessageIndex]} 💝
            </div>
          </div>
        </div>
      </div>

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-wynGreen-500 to-wynOrange-500 rounded-full shadow-lg mb-6 animate-bounce-gentle">
              <Heart className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              <span className="gradient-text floating-text">Help Save Lives</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every donation helps connect hungry pets with nourishing meals from restaurant leftovers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Donation Form */}
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Banknote className="w-6 h-6 mr-2 text-wynGreen-500" />
                  Make a Donation
                </h2>

                {/* Predefined Amounts */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Amount (₦)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className="h-12"
                      >
                        ₦{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Enter Custom Amount (₦)
                  </label>
                  <input
                    type="number" 
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wynGreen-500 focus:border-transparent"
                  />
                </div>

                {/* Donor Information - Now Optional */}
                <div className="space-y-4 mb-6">
                  <p className="text-sm text-gray-600 mb-3">
                    Donor information is optional. You can donate anonymously.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                      placeholder="Enter your name or leave blank for anonymous"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wynGreen-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                      placeholder="Enter your email or leave blank"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wynGreen-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wynGreen-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <Button
                  onClick={handlePaystackPayment}
                  className="w-full bg-gradient-to-r from-wynGreen-500 to-wynOrange-500 hover:from-wynGreen-600 hover:to-wynOrange-600 text-white py-4 text-lg font-semibold"
                >
                  Donate Now 💝
                </Button>

                <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-1" />
                  Secured by Paystack
                </div>
              </CardContent>
            </Card>

            {/* Impact Section */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <PawPrint className="w-6 h-6 text-wynOrange-500 mr-2" />
                    <h3 className="text-xl font-bold text-gray-800">Your Impact</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">₦1,000 feeds</span>
                      <span className="font-bold text-wynGreen-600">5 pets for a day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">₦3,000 feeds</span>
                      <span className="font-bold text-wynGreen-600">15 pets for a week</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">₦5,000 feeds</span>
                      <span className="font-bold text-wynGreen-600">25 pets for a month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-gradient-to-br from-wynGreen-50 to-wynOrange-50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose WYN Remnants?</h3>
                  <ul className="text-left space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-wynGreen-500 mr-2">💚</span>
                      Every rescued meal becomes hope for a hungry animal waiting for love
                    </li>
                    <li className="flex items-start">
                      <span className="text-wynGreen-500 mr-2">🐕</span>
                      Your kindness gives abandoned souls a second chance at happiness and health
                    </li>
                    <li className="flex items-start">
                      <span className="text-wynGreen-500 mr-2">🌍</span>
                      Together we heal our planet while nurturing the most vulnerable creatures
                    </li>
                    <li className="flex items-start">
                      <span className="text-wynGreen-500 mr-2">❤️</span>
                      Join a community where compassion creates miracles for innocent animals
                    </li>
                    <li className="flex items-start">
                      <span className="text-wynGreen-500 mr-2">🌱</span>
                      Your support builds a sustainable future where no animal goes hungry
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Paystack Script */}
      <script src="https://js.paystack.co/v1/inline.js"></script>
    </div>
  );
};

export default Donation;
