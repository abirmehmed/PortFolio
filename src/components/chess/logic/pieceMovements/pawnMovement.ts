
export const isValidPawnMove = (
  board: any[][],
  from: { row: number; col: number },
  to: { row: number; col: number },
  isWhite: boolean,
  lastMove?: { from: { row: number; col: number }; to: { row: number; col: number }; piece: string } | null
): boolean => {
  const direction = isWhite ? -1 : 1;
  const startRow = isWhite ? 6 : 1;
  const rowDiff = to.row - from.row;
  const colDiff = Math.abs(to.col - from.col);

  // Forward move
  if (colDiff === 0) {
    // One square forward
    if (rowDiff === direction && board[to.row][to.col] === ' ') {
      return true;
    }
    // Two squares forward from starting position
    if (rowDiff === 2 * direction && from.row === startRow && 
        board[to.row][to.col] === ' ' && board[from.row + direction][from.col] === ' ') {
      return true;
    }
  }
  
  // Diagonal capture
  if (colDiff === 1 && rowDiff === direction) {
    // Regular capture
    if (board[to.row][to.col] !== ' ') {
      const targetPiece = board[to.row][to.col];
      const isTargetWhite = targetPiece === targetPiece.toUpperCase();
      return isTargetWhite !== isWhite;
    }
    
    // En passant capture
    if (board[to.row][to.col] === ' ' && lastMove) {
      const enPassantRow = isWhite ? 3 : 4;
      if (from.row === enPassantRow &&
          lastMove.to.row === enPassantRow &&
          lastMove.to.col === to.col &&
          Math.abs(lastMove.from.row - lastMove.to.row) === 2 &&
          lastMove.piece.toLowerCase() === 'p') {
        return true;
      }
    }
  }

  return false;
};
