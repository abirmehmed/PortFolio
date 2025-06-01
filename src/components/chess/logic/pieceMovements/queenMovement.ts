
import { ChessBoard, ChessPosition } from '../../ChessTypes';
import { isValidRookMove } from './rookMovement';
import { isValidBishopMove } from './bishopMovement';

// Queen movement validation
export const isValidQueenMove = (
  board: ChessBoard,
  from: ChessPosition,
  to: ChessPosition
): boolean => {
  // Queens can move like a rook or a bishop
  return isValidRookMove(board, from, to) || isValidBishopMove(board, from, to);
};
