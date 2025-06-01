
import React from 'react';
import { ChessPosition, ChessPiece, isPieceWhite } from './ChessTypes';
import { getValidMoves } from './logic/moveValidation';
import { makeMove } from './logic/boardUtils';
import { ChessBoardComponent } from './ChessBoardComponent';
import { MoveHistoryComponent } from './MoveHistoryComponent';
import { GameControlsComponent } from './GameControlsComponent';
import { GameStatusComponent } from './GameStatusComponent';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useChessGame } from './hooks/useChessGame';
import { handleCastling, handleEnPassant } from './utils/chessHelpers';

interface ChessGameProps {
  onGameLoad?: () => void;
  initialGameState?: string;
}

export const ChessGame: React.FC<ChessGameProps> = ({ 
  onGameLoad, 
  initialGameState 
}) => {
  const {
    board,
    selectedPosition,
    possibleMoves,
    isWhiteTurn,
    gameStatus,
    moveHistory,
    isWhiteInCheck,
    isBlackInCheck,
    isGameOver,
    lastMove,
    promotionDialogOpen,
    promotionPawnPos,
    castlingRights,
    aiThinking,
    files,
    ranks,
    setSelectedPosition,
    setPossibleMoves,
    setBoard,
    setLastMove,
    setMoveHistory,
    setIsWhiteTurn,
    setCastlingRights,
    setPromotionDialogOpen,
    setPromotionPawnPos,
    setEnPassantTarget,
    updateCastlingRightsOnCapture,
    resetGame,
    undoMove,
    exportGame,
    getGameState
  } = useChessGame(onGameLoad, initialGameState);

  const handlePromotion = (promotionPiece: ChessPiece) => {
    if (!promotionPawnPos) return;
    
    const newBoard = [...board.map(row => [...row])];
    newBoard[promotionPawnPos.row][promotionPawnPos.col] = promotionPiece;
    
    setBoard(newBoard);
    setPromotionDialogOpen(false);
    setPromotionPawnPos(null);
    setIsWhiteTurn(!isWhiteTurn);

    if (lastMove) {
      setMoveHistory(prev => [...prev, {
        from: lastMove.from,
        to: lastMove.to,
        piece: lastMove.piece as ChessPiece,
        specialMove: 'promotion',
        promotedTo: promotionPiece
      }]);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (isGameOver || !isWhiteTurn || promotionDialogOpen || aiThinking) return;

    const position: ChessPosition = { row, col };
    const piece = board[row][col];
    const isPieceWhiteColor = piece !== ' ' && isPieceWhite(piece);

    if (!selectedPosition && piece !== ' ' && isPieceWhiteColor === isWhiteTurn) {
      setSelectedPosition(position);
      const moves = getValidMoves(board, position, isWhiteTurn, lastMove, castlingRights);
      setPossibleMoves(moves);
      console.log(`Selected piece at ${files[col]}${ranks[row]}, found ${moves.length} possible moves`);
      return;
    }

    if (selectedPosition) {
      if (selectedPosition.row === row && selectedPosition.col === col) {
        setSelectedPosition(null);
        setPossibleMoves([]);
        console.log('Deselected piece');
        return;
      }

      if (piece !== ' ' && isPieceWhiteColor === isWhiteTurn) {
        setSelectedPosition(position);
        const moves = getValidMoves(board, position, isWhiteTurn, lastMove, castlingRights);
        setPossibleMoves(moves);
        console.log(`Selected new piece at ${files[col]}${ranks[row]}, found ${moves.length} possible moves`);
        return;
      }

      const isValid = possibleMoves.some(move => move.row === row && move.col === col);
      
      if (!isValid) {
        console.log('Invalid move attempted');
        return;
      }

      if (isValid) {
        const selectedPiece = board[selectedPosition.row][selectedPosition.col];
        const capturedPiece = board[row][col];
        
        // Update castling rights if rook is captured
        if (capturedPiece !== ' ') {
          updateCastlingRightsOnCapture(position, capturedPiece as ChessPiece);
        }
        
        // Check for castling
        if (selectedPiece === 'K' && Math.abs(col - selectedPosition.col) === 2) {
          const castledBoard = handleCastling(board, selectedPosition, position, true);
          if (castledBoard) {
            setBoard(castledBoard);
            setLastMove({from: selectedPosition, to: position, piece: 'K'});
            setMoveHistory(prev => [...prev, {
              from: selectedPosition,
              to: position,
              piece: 'K' as ChessPiece,
              specialMove: 'castling'
            }]);
            setSelectedPosition(null);
            setPossibleMoves([]);
            setIsWhiteTurn(false);
            setCastlingRights(prev => ({...prev, whiteKingMoved: true}));
            return;
          }
        }
        
        // Check for en passant
        const enPassantBoard = handleEnPassant(board, selectedPosition, position, true, lastMove);
        if (enPassantBoard) {
          setBoard(enPassantBoard);
          setLastMove({from: selectedPosition, to: position, piece: selectedPiece});
          setMoveHistory(prev => [...prev, {
            from: selectedPosition,
            to: position,
            piece: selectedPiece as ChessPiece,
            specialMove: 'en-passant',
            captured: 'p' as ChessPiece
          }]);
          setSelectedPosition(null);
          setPossibleMoves([]);
          setIsWhiteTurn(false);
          return;
        }
        
        // Set en passant target if pawn moves two squares
        if (selectedPiece === 'P' && Math.abs(selectedPosition.row - position.row) === 2) {
          setEnPassantTarget({
            row: (selectedPosition.row + position.row) / 2,
            col: position.col
          });
        } else {
          setEnPassantTarget(null);
        }
        
        const newBoard = makeMove(board, selectedPosition, position);
        console.log(`Moving from ${files[selectedPosition.col]}${ranks[selectedPosition.row]} to ${files[col]}${ranks[row]}`);
        
        // Update castling rights
        if (selectedPiece === 'K') {
          setCastlingRights(prev => ({...prev, whiteKingMoved: true}));
        } else if (selectedPiece === 'R') {
          if (selectedPosition.col === 0 && selectedPosition.row === 7) {
            setCastlingRights(prev => ({...prev, whiteQueenSideRookMoved: true}));
          } else if (selectedPosition.col === 7 && selectedPosition.row === 7) {
            setCastlingRights(prev => ({...prev, whiteKingSideRookMoved: true}));
          }
        }
        
        // Check for pawn promotion
        if (selectedPiece === 'P' && row === 0) {
          setBoard(newBoard);
          setLastMove({from: selectedPosition, to: position, piece: selectedPiece});
          setSelectedPosition(null);
          setPossibleMoves([]);
          setPromotionPawnPos(position);
          setPromotionDialogOpen(true);
          return;
        }
        
        setBoard(newBoard);
        setLastMove({from: selectedPosition, to: position, piece: selectedPiece});
        setMoveHistory(prev => [...prev, {
          from: selectedPosition,
          to: position,
          piece: selectedPiece as ChessPiece,
          captured: board[row][col] !== ' ' ? board[row][col] as ChessPiece : undefined
        }]);
        setSelectedPosition(null);
        setPossibleMoves([]);
        setIsWhiteTurn(false);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto p-2">
      <div className="flex flex-col items-center space-y-4">
        <ChessBoardComponent
          board={board}
          selectedPosition={selectedPosition}
          possibleMoves={possibleMoves}
          lastMove={lastMove}
          isWhiteInCheck={isWhiteInCheck}
          isBlackInCheck={isBlackInCheck}
          files={files}
          ranks={ranks}
          onCellClick={handleCellClick}
        />
        
        <GameStatusComponent 
          status={gameStatus} 
          isWhiteTurn={isWhiteTurn}
          aiThinking={aiThinking}
          isGameOver={isGameOver}
        />
        
        <GameControlsComponent
          onReset={resetGame}
          onUndo={undoMove}
          onExport={exportGame}
          isGameOver={isGameOver}
          isAiThinking={aiThinking}
        />
      </div>
      
      <div className="flex-grow min-w-0">
        <MoveHistoryComponent 
          moveHistory={moveHistory} 
          files={files} 
          ranks={ranks}
        />
      </div>
      
      <Dialog open={promotionDialogOpen} onOpenChange={setPromotionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Choose promotion piece</DialogTitle>
            <DialogClose className="absolute right-4 top-4">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            <Button onClick={() => handlePromotion('Q')} className="h-16 text-3xl">♕</Button>
            <Button onClick={() => handlePromotion('R')} className="h-16 text-3xl">♖</Button>
            <Button onClick={() => handlePromotion('B')} className="h-16 text-3xl">♗</Button>
            <Button onClick={() => handlePromotion('N')} className="h-16 text-3xl">♘</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
