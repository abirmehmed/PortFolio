
// Chess types

export type ChessPiece = 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | ' ';
export type ChessBoard = ChessPiece[][];

export interface ChessPosition {
  row: number;
  col: number;
}

export interface ChessMove {
  from: ChessPosition;
  to: ChessPosition;
  piece: ChessPiece;
  captured?: ChessPiece;
  specialMove?: 'castling' | 'promotion' | 'en-passant';
  promotedTo?: ChessPiece;
}

export const isPieceAtPosition = (board: ChessBoard, position: ChessPosition): boolean => {
  return board[position.row][position.col] !== ' ';
};

export const isPieceWhite = (piece: ChessPiece): boolean => {
  return piece !== ' ' && piece === piece.toUpperCase();
};

export const isPieceBlack = (piece: ChessPiece): boolean => {
  return piece !== ' ' && piece === piece.toLowerCase();
};

export const isPieceColor = (piece: ChessPiece, isWhite: boolean): boolean => {
  if (piece === ' ') return false;
  return isWhite ? isPieceWhite(piece) : isPieceBlack(piece);
};

export const getOppositeColor = (isWhite: boolean): boolean => {
  return !isWhite;
};

export const getAlgebraicNotation = (position: ChessPosition, files: string[], ranks: string[]): string => {
  return files[position.col] + ranks[position.row];
};

// Get piece value for AI evaluation
export const getPieceValue = (piece: ChessPiece): number => {
  switch(piece.toLowerCase()) {
    case 'p': return 10;  // Pawn
    case 'n': return 30;  // Knight
    case 'b': return 30;  // Bishop
    case 'r': return 50;  // Rook
    case 'q': return 90;  // Queen
    case 'k': return 900; // King
    default: return 0;    // Empty space
  }
};

// Calculate center control value of a position
export const getCenterControlValue = (position: ChessPosition): number => {
  const centerDistance = Math.sqrt(
    Math.pow(position.row - 3.5, 2) + 
    Math.pow(position.col - 3.5, 2)
  );
  // Higher value for positions closer to center (max 3 for center squares)
  return Math.max(0, 5 - centerDistance);
};

// Get pawn structure score
export const getPawnStructureScore = (board: ChessBoard, isWhite: boolean): number => {
  let score = 0;
  const pawnChar = isWhite ? 'P' : 'p';
  
  // Check for doubled pawns (penalize)
  for (let col = 0; col < 8; col++) {
    let pawnCount = 0;
    for (let row = 0; row < 8; row++) {
      if (board[row][col] === pawnChar) {
        pawnCount++;
      }
    }
    if (pawnCount > 1) {
      score -= 5 * (pawnCount - 1);
    }
  }
  
  // Check for isolated pawns (penalize)
  for (let col = 0; col < 8; col++) {
    let hasPawn = false;
    for (let row = 0; row < 8; row++) {
      if (board[row][col] === pawnChar) {
        hasPawn = true;
        break;
      }
    }
    
    if (hasPawn) {
      let hasNeighborPawn = false;
      // Check adjacent columns
      for (let adjCol = Math.max(0, col-1); adjCol <= Math.min(7, col+1); adjCol++) {
        if (adjCol === col) continue;
        
        for (let row = 0; row < 8; row++) {
          if (board[row][adjCol] === pawnChar) {
            hasNeighborPawn = true;
            break;
          }
        }
      }
      
      if (!hasNeighborPawn) {
        score -= 5; // Penalty for isolated pawn
      }
    }
  }
  
  return score;
};
