
import { ChessBoard, ChessPosition } from '../../ChessTypes';

// Rook movement validation
export const isValidRookMove = (
  board: ChessBoard,
  from: ChessPosition,
  to: ChessPosition
): boolean => {
  // Rooks move horizontally or vertically
  if (from.row !== to.row && from.col !== to.col) return false;
  
  // Check for pieces in the path
  if (from.row === to.row) {
    // Horizontal movement
    const startCol = Math.min(from.col, to.col);
    const endCol = Math.max(from.col, to.col);
    
    for (let col = startCol + 1; col < endCol; col++) {
      if (board[from.row][col] !== ' ') return false;
    }
  } else {
    // Vertical movement
    const startRow = Math.min(from.row, to.row);
    const endRow = Math.max(from.row, to.row);
    
    for (let row = startRow + 1; row < endRow; row++) {
      if (board[row][from.col] !== ' ') return false;
    }
  }
  
  return true;
};
