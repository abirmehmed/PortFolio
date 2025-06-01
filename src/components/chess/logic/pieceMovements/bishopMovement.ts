
import { ChessBoard, ChessPosition } from '../../ChessTypes';

// Bishop movement validation
export const isValidBishopMove = (
  board: ChessBoard,
  from: ChessPosition,
  to: ChessPosition
): boolean => {
  // Bishops move diagonally
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);
  
  if (rowDiff !== colDiff) return false;
  
  // Check for pieces in the path
  const rowDir = to.row > from.row ? 1 : -1;
  const colDir = to.col > from.col ? 1 : -1;
  
  for (let i = 1; i < rowDiff; i++) {
    const row = from.row + i * rowDir;
    const col = from.col + i * colDir;
    
    if (board[row][col] !== ' ') return false;
  }
  
  return true;
};
