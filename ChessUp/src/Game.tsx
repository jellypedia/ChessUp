import { useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function Game() {
  const [game, setGame] = useState(new Chess());

  function onPieceDrop(
    sourceSquare: Square,
    targetSquare: Square,
    piece: string
  ) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to queen for simplicity
    };

    const result = game.move(move); // use same game instance

    if (result === null) return false;

    setGame(new Chess(game.fen())); // update UI
    getBotMove(); // no need to pass FEN — game already has latest state

    return true;
  }

  async function getBotMove() {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fen: game.fen() }), // get latest FEN
      });

      const data = await response.json();
      const uciMove = data.Prediction; // e.g. "e2e4" or "g8f6"

      const move = {
        from: uciMove.slice(0, 2),
        to: uciMove.slice(2, 4),
        promotion: uciMove.length === 5 ? uciMove[4] : "q", // handle promotion
      };

      const result = game.move(move);
      if (result !== null) {
        setGame(new Chess(game.fen())); // update board
      } else {
        console.error("Invalid move from bot:", move);
      }
    } catch (error) {
      console.error("Failed to fetch bot move", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <div className="text-center mb-4">Magnus Carlsen Bot</div>
        <div className="w-64">
          <Chessboard position={game.fen()} onPieceDrop={onPieceDrop} />
        </div>
      </div>
    </div>
  );
}
