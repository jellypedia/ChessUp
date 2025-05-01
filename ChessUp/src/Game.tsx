import { useState, useEffect, useContext } from "react";
import { Chess, Move, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";

export default function Game() {
  const [game, setGame] = useState(new Chess());
  const [color, setColor] = useState<"white" | "black">("white");

  useEffect(() => {
    if (color[0] !== game.turn()) {
      setTimeout(magnusAPIMove, 100);
    }
  });

  function togglePlayerColor() {
    setColor((prev) => (prev === "white" ? "black" : "white"));
    game.reset();
  }

  function playMove(move: any) {
    console.log(game.turn());
    if (game.move(move) === null) {
      console.log(game.turn());
      return false;
    } else {
      setGame(new Chess(game.fen()));
    }
  }

  function onPieceDrop(sourceSquare: Square, targetSquare: Square) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
    };

    playMove(move);
    return true;
  }

  function magnusAPIMove() {
    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fen: game.fen() }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Fetched failed.");
        }
      })
      .then((data) => {
        const prediction = data.Prediction;
        const move = {
          from: prediction.slice(0, 2),
          to: prediction.slice(2, 4),
        };
        playMove(move);
      });
  }

  return (
    <div className="flex justify-center items-stretch">
      <div>
        <div>
          <Player
            image="src/assets/magnus.png"
            name="Magnus Carlsen"
            elo={2909}
            title="GM"
          />
          <Chessboard
            position={game.fen()}
            onPieceDrop={onPieceDrop}
            boardWidth={350}
            boardOrientation={color}
            key={color}
          />

          <Player
            image="src/assets/player.png"
            name="Jellatino"
            elo={250}
            title="NB"
          />
        </div>
      </div>
      <div className="ml-5 flex flex-col">
        <Sidebar />
        <div className="justify-center items-center">
          <button
            type="button"
            className="m-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onKeyDown={togglePlayerColor}
          >
            Play as {color === "white" ? "Black" : "White"}
          </button>
          <button>Resign</button>
        </div>
      </div>
    </div>
  );
}
