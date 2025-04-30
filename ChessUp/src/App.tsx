import { useState } from "react";
import { Chess } from "chess.js";
import Game from "./Game";

function App() {
  const [game, setGame] = useState(new Chess());
  // const makeMove = async (sourceSquare: string, targetSquare: string) => {
  //   const move = game.move({ from: sourceSquare, to: targetSquare });
  //   if (!move) return false;

  //   setGame(new Chess(game.fen()));

  //   const response = await fetch("https://chess-api.com/v1", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ fen: game.fen() }),
  //   });

  //   const data = await response.json();
  //   console.log("data.move", game.move);
  //   console.log(data);

  //   setGame(new Chess(game.fen()));

  //   return true;
  // };
  return (
    <>
      <div className="justify-center">
        <Game />
      </div>
    </>
  );
}

export default App;
