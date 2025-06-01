
import React from 'react';

interface GameStatusComponentProps {
  status: string;
  isWhiteTurn: boolean;
  aiThinking: boolean;
  isGameOver: boolean;
}

export const GameStatusComponent: React.FC<GameStatusComponentProps> = ({ 
  status, 
  isWhiteTurn, 
  aiThinking, 
  isGameOver 
}) => {
  return (
    <div className="text-center space-y-2">
      <div className="text-lg font-semibold text-foreground">
        {status}
      </div>
      {aiThinking && (
        <div className="text-sm text-muted-foreground animate-pulse">
          AI is thinking...
        </div>
      )}
      {!isGameOver && (
        <div className="text-sm text-muted-foreground">
          {isWhiteTurn ? "Your turn" : "AI's turn"}
        </div>
      )}
    </div>
  );
};
