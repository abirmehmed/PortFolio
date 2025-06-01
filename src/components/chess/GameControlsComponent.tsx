
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Undo } from 'lucide-react';

interface GameControlsComponentProps {
  onReset: () => void;
  onUndo: () => void;
  onExport: () => void;
  isGameOver: boolean;
  isAiThinking: boolean;
}

export const GameControlsComponent: React.FC<GameControlsComponentProps> = ({ 
  onReset, 
  onUndo, 
  onExport, 
  isGameOver, 
  isAiThinking 
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        onClick={onReset}
        variant="outline"
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        New Game
      </Button>
      
      <Button
        onClick={onUndo}
        variant="outline"
        disabled={isAiThinking}
        className="flex items-center gap-2"
      >
        <Undo className="h-4 w-4" />
        Undo Move
      </Button>
      
      <Button
        onClick={onExport}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export Game
      </Button>
      
      {isGameOver && (
        <div className="w-full mt-4 text-center">
          <Button 
            onClick={onReset}
            className="bg-detective-accent text-detective-dark hover:bg-detective-accent/90"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};
