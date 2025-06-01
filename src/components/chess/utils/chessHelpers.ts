
import { ChessBoard, ChessPosition, ChessPiece } from '../ChessTypes';
import { makeMove } from '../logic/boardUtils';

export const handleCastling = (
  board: ChessBoard,
  kingFrom: ChessPosition,
  kingTo: ChessPosition,
  isWhite: boolean
): ChessBoard | null => {
  const kingRow = isWhite ? 7 : 0;
  
  if (kingFrom.row !== kingRow || Math.abs(kingTo.col - kingFrom.col) !== 2) {
    return null;
  }
  
  const newBoard = [...board.map(row => [...row])];
  
  if (kingTo.col === 6) { // Kingside castling
    if (board[kingRow][7] !== (isWhite ? 'R' : 'r') || 
        board[kingRow][5] !== ' ' || 
        board[kingRow][6] !== ' ') {
      return null;
    }
    
    newBoard[kingRow][6] = isWhite ? 'K' : 'k';
    newBoard[kingRow][4] = ' ';
    newBoard[kingRow][5] = isWhite ? 'R' : 'r';
    newBoard[kingRow][7] = ' ';
    
    return newBoard;
  }
  
  if (kingTo.col === 2) { // Queenside castling
    if (board[kingRow][0] !== (isWhite ? 'R' : 'r') || 
        board[kingRow][1] !== ' ' || 
        board[kingRow][2] !== ' ' || 
        board[kingRow][3] !== ' ') {
      return null;
    }
    
    newBoard[kingRow][2] = isWhite ? 'K' : 'k';
    newBoard[kingRow][4] = ' ';
    newBoard[kingRow][3] = isWhite ? 'R' : 'r';
    newBoard[kingRow][0] = ' ';
    
    return newBoard;
  }
  
  return null;
};

export const handleEnPassant = (
  board: ChessBoard,
  from: ChessPosition,
  to: ChessPosition,
  isPieceWhite: boolean,
  lastMove: {from: ChessPosition, to: ChessPosition, piece: string} | null
): ChessBoard | null => {
  const piece = board[from.row][from.col].toLowerCase();
  if (piece !== 'p') return null;
  
  if (from.col !== to.col && board[to.row][to.col] === ' ') {
    if (lastMove && 
        Math.abs(lastMove.from.row - lastMove.to.row) === 2 && 
        lastMove.to.col === to.col && 
        lastMove.to.row === from.row && 
        lastMove.piece.toLowerCase() === 'p') {
      
      const newBoard = [...board.map(row => [...row])];
      newBoard[to.row][to.col] = board[from.row][from.col];
      newBoard[from.row][from.col] = ' ';
      newBoard[from.row][to.col] = ' ';
      
      return newBoard;
    }
  }
  
  return null;
};

export const checkPawnPromotion = (board: ChessBoard, position: ChessPosition): boolean => {
  const piece = board[position.row][position.col];
  return (piece === 'P' && position.row === 0) || (piece === 'p' && position.row === 7);
};
