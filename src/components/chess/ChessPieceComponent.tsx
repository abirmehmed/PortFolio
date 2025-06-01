
import React from 'react';

interface ChessPieceProps {
  piece: string;
}

export const ChessPieceComponent: React.FC<ChessPieceProps> = ({ piece }) => {
  // If empty square, return null
  if (piece === ' ') return null;

  // Get piece symbol
  const getPieceSymbol = (piece: string): string => {
    const isWhite = piece === piece.toUpperCase();
    const pieceType = piece.toLowerCase();
    
    switch (pieceType) {
      case 'k': return isWhite ? "♔" : "♚";
      case 'q': return isWhite ? "♕" : "♛";
      case 'r': return isWhite ? "♖" : "♜";
      case 'b': return isWhite ? "♗" : "♝";
      case 'n': return isWhite ? "♘" : "♞";
      case 'p': return isWhite ? "♙" : "♟";
      default: return "";
    }
  };

  const pieceSymbol = getPieceSymbol(piece);
  const isWhite = piece === piece.toUpperCase();

  return (
    <div 
      className={`chess-piece select-none text-3xl ${isWhite ? 'text-white' : 'text-black'}`}
      style={{
        textShadow: isWhite 
          ? '0px 0px 2px #000, 0px 0px 2px #000' 
          : '0px 0px 1px #fff, 0px 0px 1px #fff',
        transform: 'translateY(-2px)'
      }}
    >
      {pieceSymbol}
    </div>
  );
};
