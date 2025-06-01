
import { ChessBoard, ChessPosition } from '../ChessTypes';

// Clone the board
export const cloneBoard = (board: ChessBoard): ChessBoard => {
  return board.map(row => [...row]);
};

// Make a move on the board
export const makeMove = (
  board: ChessBoard, 
  from: ChessPosition, 
  to: ChessPosition
): ChessBoard => {
  const newBoard = cloneBoard(board);
  newBoard[to.row][to.col] = newBoard[from.row][from.col];
  newBoard[from.row][from.col] = ' ';
  return newBoard;
};
