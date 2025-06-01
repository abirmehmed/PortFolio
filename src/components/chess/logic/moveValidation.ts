
import { ChessBoard, ChessPosition } from '../ChessTypes';
import { makeMove } from './boardUtils';
import { 
  isValidPawnMove, 
  isValidRookMove, 
  isValidKnightMove,
  isValidBishopMove,
  isValidQueenMove,
  isValidKingMove
} from './pieceMovements';
import { isKingInCheck, setupIsValidMove, setupGetValidMoves } from './gameState';

// Check if a move is valid
export const isValidMove = (
  board: ChessBoard,
  from: ChessPosition,
  to: ChessPosition,
  isWhiteTurn: boolean,
  lastMove?: {from: ChessPosition, to: ChessPosition, piece: string} | null
): boolean => {
  const piece = board[from.row][from.col];
  
  // Can't move if there's no piece
  if (piece === ' ') return false;
  
  // Can't move opponent's piece
  const isPieceWhite = piece === piece.toUpperCase();
  if (isPieceWhite !== isWhiteTurn) return false;
  
  // Can't capture own piece
  const targetPiece = board[to.row][to.col];
  if (targetPiece !== ' ') {
    const isTargetWhite = targetPiece === targetPiece.toUpperCase();
    if (isPieceWhite === isTargetWhite) return false;
  }
  
  // Specific piece movement validation
  const pieceType = piece.toLowerCase();
  
  switch (pieceType) {
    case 'p': // Pawn
      return isValidPawnMove(board, from, to, isPieceWhite, lastMove);
    case 'r': // Rook
      return isValidRookMove(board, from, to);
    case 'n': // Knight
      return isValidKnightMove(from, to);
    case 'b': // Bishop
      return isValidBishopMove(board, from, to);
    case 'q': // Queen
      return isValidQueenMove(board, from, to);
    case 'k': // King
      return isValidKingMove(from, to);
    default:
      return false;
  }
};

// Set up the reference to isValidMove in gameState
setupIsValidMove(isValidMove);

// Get all valid moves for a piece
export const getValidMoves = (
  board: ChessBoard,
  position: ChessPosition,
  isWhiteTurn: boolean,
  lastMove?: {from: ChessPosition, to: ChessPosition, piece: string} | null,
  castlingRights?: {
    whiteKingMoved: boolean,
    whiteKingSideRookMoved: boolean,
    whiteQueenSideRookMoved: boolean,
    blackKingMoved: boolean,
    blackKingSideRookMoved: boolean,
    blackQueenSideRookMoved: boolean
  }
): ChessPosition[] => {
  const validMoves: ChessPosition[] = [];
  const piece = board[position.row][position.col];
  
  // No piece or wrong color
  if (piece === ' ' || (piece === piece.toUpperCase()) !== isWhiteTurn) return [];
  
  // Special case for king and castling
  if ((piece === 'K' || piece === 'k') && castlingRights) {
    const kingRow = isWhiteTurn ? 7 : 0;
    
    // Check kingside castling
    if (!(isWhiteTurn ? castlingRights.whiteKingMoved : castlingRights.blackKingMoved) &&
        !(isWhiteTurn ? castlingRights.whiteKingSideRookMoved : castlingRights.blackKingSideRookMoved)) {
      if (board[kingRow][5] === ' ' && board[kingRow][6] === ' ' && 
          board[kingRow][7] === (isWhiteTurn ? 'R' : 'r')) {
        // Check if king is not in check and doesn't pass through check
        if (!isKingInCheck(board, isWhiteTurn)) {
          const tempBoard1 = makeMove(board, position, {row: kingRow, col: 5});
          if (!isKingInCheck(tempBoard1, isWhiteTurn)) {
            validMoves.push({row: kingRow, col: 6}); // Allow castling kingside
          }
        }
      }
    }
    
    // Check queenside castling
    if (!(isWhiteTurn ? castlingRights.whiteKingMoved : castlingRights.blackKingMoved) &&
        !(isWhiteTurn ? castlingRights.whiteQueenSideRookMoved : castlingRights.blackQueenSideRookMoved)) {
      if (board[kingRow][1] === ' ' && board[kingRow][2] === ' ' && board[kingRow][3] === ' ' &&
          board[kingRow][0] === (isWhiteTurn ? 'R' : 'r')) {
        // Check if king is not in check and doesn't pass through check
        if (!isKingInCheck(board, isWhiteTurn)) {
          const tempBoard1 = makeMove(board, position, {row: kingRow, col: 3});
          if (!isKingInCheck(tempBoard1, isWhiteTurn)) {
            validMoves.push({row: kingRow, col: 2}); // Allow castling queenside
          }
        }
      }
    }
  }
  
  // Check all possible positions
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const targetPos = { row, col };
      
      // Skip the current position
      if (row === position.row && col === position.col) continue;
      
      // Check if this is a valid move
      if (isValidMove(board, position, targetPos, isWhiteTurn, lastMove)) {
        // Make sure move doesn't put or leave own king in check
        const tempBoard = makeMove(board, position, targetPos);
        if (!isKingInCheck(tempBoard, isWhiteTurn)) {
          validMoves.push(targetPos);
        }
      }
    }
  }
  
  return validMoves;
};

// Set up the reference to getValidMoves in gameState
setupGetValidMoves(getValidMoves);
