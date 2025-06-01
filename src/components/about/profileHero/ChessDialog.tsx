
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { ChessGame } from '@/components/chess/ChessGame';
import LoadingScreen from '@/components/LoadingScreen';

interface ChessDialogProps {
  isChessDialogOpen: boolean;
  setIsChessDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChessDialog: React.FC<ChessDialogProps> = ({ isChessDialogOpen, setIsChessDialogOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setIsLoading(true);
    }
    setIsChessDialogOpen(open);
  };
  
  const handleChessGameLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <Dialog open={isChessDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-detective-accent/50 bg-gradient-to-r from-detective-dark/10 to-detective-blue/10 hover:from-detective-dark/20 hover:to-detective-blue/20 hover:scale-105 transition-all duration-300 shadow-md"
        >
          {/* Chess Knight Icon */}
          <KnightIcon className="mr-2 h-4 w-4 text-detective-accent" /> 
          Play Chess
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] md:max-w-[1000px] p-0 max-h-[90vh] overflow-auto bg-card/95 backdrop-blur-sm border border-detective-accent/20 rounded-xl shadow-xl transition-all duration-300">
        <DialogHeader className="p-6 border-b border-detective-accent/10 bg-gradient-to-r from-detective-dark/30 to-transparent sticky top-0 z-20 backdrop-blur-sm">
          <DialogTitle className="text-2xl font-bold text-gradient flex items-center">
            <KnightIcon className="mr-2 h-6 w-6 text-detective-accent" /> 
            Chess Challenge
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 z-10 flex items-center justify-center">
              <LoadingScreen message="Setting up the chessboard..." />
            </div>
          )}
          <p className="mb-4 text-muted-foreground">
            Challenge the AI in a game of chess! You play as white. The game features castling, pawn promotion, en passant,
            and captures. Can you checkmate the AI?
          </p>
          <ChessGame onGameLoad={handleChessGameLoad} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Custom Knight Icon Component
const KnightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M17 3H7L4 7L8 13L7 21H17L16 13L20 7L17 3Z" />
    <path d="M13 7L10 11L12 15V21" />
    <path d="M7 6C7 6 8 8 10 8C12 8 13 6 13 6" />
  </svg>
);

export default ChessDialog;
