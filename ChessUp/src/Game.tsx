import { useState, useEffect, useRef } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";

export default function Game() {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [color, setColor] = useState<"white" | "black">("white");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (color[0] !== gameRef.current.turn()) {
      setTimeout(magnusAPIMove, 100);
    }
  }, [fen, color]);

  function togglePlayerColor() {
    gameRef.current.reset();
    setFen(gameRef.current.fen());
    setHistory([]);
    setColor((prev) => (prev === "white" ? "black" : "white"));
  }

  function playMove(move: {
    from: string;
    to: string;
    promotion?: "q" | "r" | "b" | "n";
  }) {
    const isPawnPromotion =
      (move.from[1] === "7" && gameRef.current.turn() === "w") ||
      (move.from[1] === "2" && gameRef.current.turn() === "b");

    if (isPawnPromotion) {
      move.promotion = "q";
    }

    const result = gameRef.current.move(move);
    if (result === null) return false;

    setFen(gameRef.current.fen());
    setHistory([...gameRef.current.history()]);
    if (gameRef.current.isCheckmate()) {
      alert("Checkmate!");
    }

    return true;
  }

  function onPieceDrop(sourceSquare: Square, targetSquare: Square) {
    return playMove({ from: sourceSquare, to: targetSquare });
  }

  function magnusAPIMove() {
    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fen: gameRef.current.fen() }),
    })
      .then((res) => res.json())
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
        <Player
          image="src/assets/magnus.png"
          name="Magnus Carlsen"
          elo={2909}
          title="GM"
        />
        <Chessboard
          position={fen}
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
      <div className="ml-5 flex flex-col">
        <Sidebar history={history} />
        {/* <div className="justify-center items-center flex">
          <button
            type="button"
            className="m-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            onClick={togglePlayerColor}
          >
            Play as {color === "white" ? "Black" : "White"}
          </button>
        </div> */}
      </div>
    </div>
  );
}
