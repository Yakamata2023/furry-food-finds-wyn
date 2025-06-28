
import RetractableMenu from "@/components/RetractableMenu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WYNRunnerGame from "@/components/WYNRunnerGame";

const Game = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wynGreen-50 via-white to-wynOrange-50">
      <RetractableMenu />
      <Header onOpenAuth={() => {}} />
      
      <main className="pt-20 pb-10">
        <WYNRunnerGame />
      </main>

      <Footer />
    </div>
  );
};

export default Game;
