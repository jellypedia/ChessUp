import pandas as pd
import pickle 
from chess import Board
import numpy as np
from flask import Flask, request, jsonify
from utils import board_to_matrix

from flask_cors import CORS


app = Flask(__name__)
CORS(app)

model = pickle.load(open("pkl/magnus_carlsen_model.pkl","rb"))
int_to_move = pickle.load(open("pkl/int_to_move.pkl","rb"))

@app.route('/keepalive',methods=['GET'])
def api_health():
    return jsonify(Message="Success")

@app.route('/predict',methods=['POST'])
def predict():
    data = request.get_json()

    # accepts FEN string move
    fen = data.get("fen")
    if not fen:
        return jsonify({"error": "FEN not provided"}), 400
    
    try:
        # converts FEN string to board
        board = Board(fen)
    except Exception as e:
        return jsonify({"error": f"Invalid FEN:{str(e)}"}), 400
    
    # convert FEN string move to Board tensor ting
    input_matrix = board_to_matrix(board)
    # print("INPUT MATRIX:",input_matrix)
    input_tensor = input_matrix.reshape(1,8,8,16)
    # print("INPUT TENSOR:",input_tensor)

    prediction = model.predict(input_tensor)
    predicted_move = int(prediction.argmax(axis=1).tolist()[0])

    uci_predicted_move = int_to_move[predicted_move]
    print(uci_predicted_move)

    return jsonify({"Prediction":uci_predicted_move})

if __name__ == "__main__":
    app.run(debug=True)

