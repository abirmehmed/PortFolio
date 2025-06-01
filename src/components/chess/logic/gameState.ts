
import { ChessBoard, ChessPosition } from '../ChessTypes';
import { makeMove } from './boardUtils';

// This function is forward-declared to avoid circular dependencies
let isValidMoveFn: (board: ChessBoard, from: ChessPosition, to: ChessPosition, isWhiteTurn: boolean) => boolean;

// Set up the function reference (will be called by moveValidation.ts)
export const setupIsValidMove = (validMoveFn: typeof isValidMoveFn) => {
  isValidMoveFn = validMoveFn;
};

// Check if the king is in check
export const isKingInCheck = (board: ChessBoard, isWhiteKing: boolean): boolean => {
  // Find the king
  let kingPos: ChessPosition | null = null;
  const kingPiece = isWhiteKing ? 'K' : 'k';
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === kingPiece) {
        kingPos = { row, col };
        break;
      }
    }
    if (kingPos) break;
  }
  
  if (!kingPos) return false; // King not found (shouldn't happen in a valid game)
  
  // Check if any opponent piece can attack the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      
      // Skip empty squares and own pieces
      if (piece === ' ' || (isWhiteKing === (piece === piece.toUpperCase()))) continue;
      
      // Check if this piece can attack the king
      const from = { row, col };
      
      // If isValidMove is not yet set up, we can't check
      if (!isValidMoveFn) return false;
      
      const canAttack = isValidMoveFn(board, from, kingPos, !isWhiteKing);
      
      if (canAttack) return true;
    }
  }
  
  return false;
};

// Check if the position is in check
export const isCheck = (board: ChessBoard, isWhiteKing: boolean): boolean => {
  return isKingInCheck(board, isWhiteKing);
};

// Function for getting valid moves (to be imported from moveValidation)
let getValidMovesFn: (
  board: ChessBoard,
  position: ChessPosition,
  isWhiteTurn: boolean
) => ChessPosition[];

// Set up the function reference
export const setupGetValidMoves = (validMovesFn: typeof getValidMovesFn) => {
  getValidMovesFn = validMovesFn;
};

// Check if the king is in checkmate
export const isCheckmate = (board: ChessBoard, isWhiteKing: boolean): boolean => {
  // If not in check, can't be checkmate
  if (!isKingInCheck(board, isWhiteKing)) return false;
  
  // Check if any move can get the king out of check
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      
      // Skip empty squares and opponent pieces
      if (piece === ' ' || (isWhiteKing !== (piece === piece.toUpperCase()))) continue;
      
      // Get valid moves for this piece
      const from = { row, col };
      
      // If getValidMoves is not yet set up, we can't check
      if (!getValidMovesFn) return false;
      
      const validMoves = getValidMovesFn(board, from, isWhiteKing);
      
      // If any valid move exists, it's not checkmate
      if (validMoves.length > 0) return false;
    }
  }
  
  // No valid moves found, it's checkmate
  return true;
};
