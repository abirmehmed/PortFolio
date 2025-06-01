
import React from 'react';
import { ChessMove } from './ChessTypes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Crown, Castle } from 'lucide-react';

interface MoveHistoryComponentProps {
  moveHistory: ChessMove[];
  files: string[];
  ranks: string[];
}

export const MoveHistoryComponent: React.FC<MoveHistoryComponentProps> = ({ 
  moveHistory,
  files,
  ranks
}) => {
  const getChessNotation = (move: ChessMove, files: string[], ranks: string[]): string => {
    const pieceSymbols: Record<string, string> = {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': ''
    };
    
    const from = `${files[move.from.col]}${ranks[move.from.row]}`;
    const to = `${files[move.to.col]}${ranks[move.to.row]}`;
    
    // Handle special moves
    if (move.specialMove === 'castling') {
      // Kingside or queenside castling
      if (move.to.col === 6) {
        return "O-O";  // Kingside castling
      } else {
        return "O-O-O";  // Queenside castling
      }
    }
    
    if (move.specialMove === 'promotion') {
      const promotedPieceSymbol = move.promotedTo ? pieceSymbols[move.promotedTo.toUpperCase()] : '♕';  // Default to queen
      return `${from}-${to}=${promotedPieceSymbol}`;
    }
    
    // Simple notation
    const piece = move.piece.toUpperCase() === 'P' ? '' : pieceSymbols[move.piece];
    const captureSymbol = move.captured ? 'x' : '→';
    
    return `${piece}${from} ${captureSymbol} ${to}`;
  };

  // Group moves by turn (white and black)
  const groupedMoves: {white: ChessMove, black?: ChessMove}[] = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    groupedMoves.push({
      white: moveHistory[i],
      black: moveHistory[i + 1]
    });
  }

  // Get the icon for the move type
  const getMoveIcon = (move: ChessMove) => {
    if (move.specialMove === 'castling') {
      return <Castle className="h-4 w-4 text-blue-400 mr-1" />;
    }
    if (move.specialMove === 'promotion') {
      return <Crown className="h-4 w-4 text-purple-400 mr-1" />;
    }
    if (move.captured) {
      return <span className="text-red-400 mr-1">⚔️</span>;
    }
    return null;
  };

  return (
    <div className="mb-4 border rounded-lg overflow-hidden bg-card/70 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="bg-muted/90 backdrop-blur-sm p-3 border-b border-border/50 flex items-center">
        <Crown className="h-4 w-4 text-detective-accent mr-2" />
        <h3 className="font-semibold text-sm">Game History</h3>
      </div>
      <ScrollArea className="h-[250px] md:h-[400px]">
        <Table>
          <TableHeader className="sticky top-0 bg-muted/90 backdrop-blur-sm z-10">
            <TableRow>
              <TableHead className="w-10 text-detective-accent font-semibold">#</TableHead>
              <TableHead className="text-detective-accent font-semibold">White</TableHead>
              <TableHead className="text-detective-accent font-semibold">Black</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedMoves.map((turn, idx) => (
              <TableRow key={idx} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-mono text-muted-foreground">{idx + 1}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-1 bg-white/5 p-1 rounded">
                    <div className="flex items-center">
                      {getMoveIcon(turn.white)}
                      <span className="text-white">{getChessNotation(turn.white, files, ranks)}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {turn.black && (
                    <div className="flex items-center space-x-1 bg-black/5 p-1 rounded">
                      <div className="flex items-center">
                        {getMoveIcon(turn.black)}
                        <span className="text-white">{getChessNotation(turn.black, files, ranks)}</span>
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {moveHistory.length === 0 && (
          <div className="p-8 text-center text-muted-foreground italic">
            No moves yet. You play as white.
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
