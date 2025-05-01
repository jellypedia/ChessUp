import Game from "./Game";
import chessBg from "./assets/chess-bg1.png";

function App() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${chessBg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="bg-white/25 rounded-md p-4 outline outline-1 outline-gray-400">
          <Game />
        </div>
      </div>
    </div>
  );
}

export default App;
