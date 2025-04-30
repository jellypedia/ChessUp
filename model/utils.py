from chess import Board
import numpy as np

def board_to_matrix(board: Board):
  matrix = np.zeros((8,8,16)) # 8x8 chessboard, 16 channels
  piece_map = board.piece_map()
  for square, piece in piece_map.items():
    row, col = divmod(square,8)
    piece_type = piece.piece_type - 1
    piece_color = 0 if piece.color else 6
    matrix[row,col,piece_type + piece_color] = 1

  for move in board.legal_moves:
    row, col = divmod(move.to_square,8)
    matrix[row,col,13] = 1

    if board.is_check() is True:
      king_square = board.king(board.turn)
      if king_square is not None:
        row, col = divmod(king_square,8)
        matrix[row,col,14] = 1

    if board.is_capture(move) and board.has_legal_en_passant():
      row, col = divmod(move.to_square,8)
      matrix[row,col,15] = 1

  return matrix

def encode_moves(moves):
    move_to_int = {move: idx for idx, move in enumerate(set(moves))}
    return [move_to_int[move] for move in moves], move_to_int