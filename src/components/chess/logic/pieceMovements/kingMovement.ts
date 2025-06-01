
import { ChessPosition } from '../../ChessTypes';

// King movement validation
export const isValidKingMove = (
  from: ChessPosition,
  to: ChessPosition
): boolean => {
  // Kings move one square in any direction
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);
  
  return rowDiff <= 1 && colDiff <= 1 && (rowDiff > 0 || colDiff > 0);
};
