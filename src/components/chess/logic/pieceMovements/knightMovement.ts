
import { ChessPosition } from '../../ChessTypes';

// Knight movement validation
export const isValidKnightMove = (
  from: ChessPosition,
  to: ChessPosition
): boolean => {
  // Knights move in an L-shape: 2 squares in one direction and 1 square perpendicular
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);
  
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};
