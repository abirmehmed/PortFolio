
import React from 'react';
import { ChessBoard, ChessPosition } from './ChessTypes';
import { ChessPieceComponent } from './ChessPieceComponent';

interface ChessBoardComponentProps {
  board: ChessBoard;
  selectedPosition: ChessPosition | null;
  possibleMoves: ChessPosition[];
  lastMove: {from: ChessPosition, to: ChessPosition} | null;
  isWhiteInCheck: boolean;
  isBlackInCheck: boolean;
  files: string[];
  ranks: string[];
  onCellClick: (row: number, col: number) => void;
}

export const ChessBoardComponent: React.FC<ChessBoardComponentProps> = ({
  board,
  selectedPosition,
  possibleMoves,
  lastMove,
  isWhiteInCheck,
  isBlackInCheck,
  files,
  ranks,
  onCellClick
}) => {
  // Get cell class based on its properties
  const getCellClass = (row: number, col: number) => {
    const isSelected = selectedPosition?.row === row && selectedPosition?.col === col;
    const isPossibleMove = possibleMoves.some(move => move.row === row && move.col === col);
    const isLastMoveFrom = lastMove && lastMove.from.row === row && lastMove.from.col === col;
    const isLastMoveTo = lastMove && lastMove.to.row === row && lastMove.to.col === col;
    const isCheck = (isWhiteInCheck && board[row][col] === 'K') || (isBlackInCheck && board[row][col] === 'k');
    
    const darkSquare = (row + col) % 2 === 1;
    
    return `
      w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
      flex items-center justify-center text-xl sm:text-2xl relative cursor-pointer
      ${darkSquare ? 'bg-[#B58863]' : 'bg-[#F0D9B5]'} 
      ${isSelected ? 'ring-2 ring-yellow-400 ring-opacity-70' : ''}
      ${isPossibleMove ? 'hover:bg-green-400/30 transition-colors duration-150' : ''}
      ${isCheck ? 'bg-red-500/40 animate-pulse' : ''}
      ${isLastMoveFrom ? 'bg-blue-300/20' : ''}
      ${isLastMoveTo ? 'bg-blue-400/30' : ''}
      hover:opacity-95 transition-all duration-200
    `;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex select-none">
        {/* Ranks (row) labels */}
        <div className="flex flex-col justify-around pr-1 sm:pr-2">
          {ranks.map((rank) => (
            <div key={rank} className="h-10 sm:h-12 md:h-14 lg:h-16 flex items-center justify-center text-xs sm:text-sm font-medium text-detective-accent">
              {rank}
            </div>
          ))}
        </div>
        
        {/* Chessboard */}
        <div>
          <div className="chessboard border border-gray-400 rounded-sm overflow-hidden shadow-xl">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((piece, colIndex) => (
                  <div 
                    key={`${rowIndex}-${colIndex}`}
                    className={getCellClass(rowIndex, colIndex)}
                    onClick={() => onCellClick(rowIndex, colIndex)}
                    title={`${files[colIndex]}${ranks[rowIndex]}`}
                  >
                    <ChessPieceComponent piece={piece} />
                    
                    {/* Highlight dot for possible moves */}
                    {possibleMoves.some(move => move.row === rowIndex && move.col === colIndex) && piece === ' ' && (
                      <div className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/60 z-10"></div>
                    )}
                    
                    {/* Highlight for possible captures */}
                    {possibleMoves.some(move => move.row === rowIndex && move.col === colIndex) && piece !== ' ' && (
                      <div className="absolute inset-0 border-2 border-red-500/50 rounded-sm z-10"></div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Files (column) labels */}
          <div className="flex justify-around">
            {files.map((file) => (
              <div key={file} className="w-10 sm:w-12 md:w-14 lg:w-16 flex items-center justify-center text-xs sm:text-sm font-medium text-detective-accent">
                {file}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
