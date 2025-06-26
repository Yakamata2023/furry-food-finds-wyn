
import { Card, CardContent } from "@/components/ui/card";

const FoodCategories = () => {
  const categories = [
    { name: "Bones & Treats", emoji: "🦴", description: "Safe bones and natural treats", color: "from-amber-400 to-orange-500" },
    { name: "Fish & Seafood", emoji: "🐟", description: "Fresh fish and seafood remnants", color: "from-blue-400 to-cyan-500" },
    { name: "Grains & Rice", emoji: "🌾", description: "Healthy grains and rice dishes", color: "from-yellow-400 to-amber-500" },
    { name: "Bread & Bakery", emoji: "🍞", description: "Fresh bread and baked goods", color: "from-orange-400 to-red-500" },
    { name: "Soups & Broths", emoji: "🍲", description: "Nutritious soups and broths", color: "from-green-400 to-teal-500" },
    { name: "Vegetables", emoji: "🥕", description: "Fresh vegetables and greens", color: "from-green-500 to-emerald-600" },
    { name: "Fruits", emoji: "🍎", description: "Pet-safe fruits and treats", color: "from-red-400 to-pink-500" },
    { name: "Dairy Products", emoji: "🥛", description: "Safe dairy options for pets", color: "from-indigo-400 to-purple-500" }
  ];

  return (
    <section id="categories" className="py-20 px-4 bg-gradient-to-br from-wynGreen-50 to-wynOrange-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="gradient-text floating-text">Food Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organized categories to help you find the perfect food remnants for your beloved pets.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-full mb-4 group-hover:animate-bounce-gentle`}>
                  <span className="text-2xl">{category.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 inline-block">
            <span className="text-wynGreen-600 font-semibold">🌟 Safety First:</span> All food categories follow strict pet safety guidelines
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;
