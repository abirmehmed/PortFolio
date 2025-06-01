
import { useState, useEffect, useRef } from 'react';
import { 
  ChessBoard as ChessBoardType, 
  ChessPosition, 
  ChessMove,
  ChessPiece,
  isPieceWhite
} from '../ChessTypes';
import { makeMove } from '../logic/boardUtils';
import { isCheck, isCheckmate } from '../logic/gameState';
import { getValidMoves } from '../logic/moveValidation';
import { getBestMove } from '../ai/ChessAI';

const initialBoard: ChessBoardType = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

// Check for stalemate
const isStalemate = (board: ChessBoardType, isWhite: boolean): boolean => {
  // If in check, it's not stalemate
  if (isCheck(board, isWhite)) return false;
  
  // Check if any legal moves exist
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece !== ' ' && isPieceWhite(piece) === isWhite) {
        const validMoves = getValidMoves(board, { row, col }, isWhite);
        if (validMoves.length > 0) {
          return false; // Found a legal move, not stalemate
        }
      }
    }
  }
  
  return true; // No legal moves and not in check = stalemate
};

export const useChessGame = (onGameLoad?: () => void, initialGameState?: string) => {
  const [board, setBoard] = useState<ChessBoardType>(initialBoard);
  const [selectedPosition, setSelectedPosition] = useState<ChessPosition | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<ChessPosition[]>([]);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState<string>("White to move");
  const [moveHistory, setMoveHistory] = useState<ChessMove[]>([]);
  const [moveHistoryStack, setMoveHistoryStack] = useState<{
    board: ChessBoardType;
    isWhiteTurn: boolean;
    move: ChessMove;
  }[]>([]);
  const [isWhiteInCheck, setIsWhiteInCheck] = useState(false);
  const [isBlackInCheck, setIsBlackInCheck] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastMove, setLastMove] = useState<{from: ChessPosition, to: ChessPosition, piece: string} | null>(null);
  const [promotionDialogOpen, setPromotionDialogOpen] = useState(false);
  const [promotionPawnPos, setPromotionPawnPos] = useState<ChessPosition | null>(null);
  const [castlingRights, setCastlingRights] = useState({
    whiteKingMoved: false,
    whiteKingSideRookMoved: false,
    whiteQueenSideRookMoved: false,
    blackKingMoved: false,
    blackKingSideRookMoved: false,
    blackQueenSideRookMoved: false
  });
  const [aiThinking, setAiThinking] = useState(false);
  const [enPassantTarget, setEnPassantTarget] = useState<ChessPosition | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const aiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  // Notify parent when game is loaded
  useEffect(() => {
    if (onGameLoad) {
      onGameLoad();
    }
  }, [onGameLoad]);

  // Load game state
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const gameStateParam = urlParams.get('chessGame');
      
      if (gameStateParam) {
        const gameData = JSON.parse(decodeURIComponent(gameStateParam));
        if (gameData.board) setBoard(gameData.board);
        if (gameData.isWhiteTurn !== undefined) setIsWhiteTurn(gameData.isWhiteTurn);
        if (gameData.moveHistory) setMoveHistory(gameData.moveHistory);
        if (gameData.castlingRights) setCastlingRights(gameData.castlingRights);
        if (gameData.lastMove) setLastMove(gameData.lastMove);
      } else if (initialGameState) {
        const gameData = JSON.parse(initialGameState);
        if (gameData.board) setBoard(gameData.board);
        if (gameData.isWhiteTurn !== undefined) setIsWhiteTurn(gameData.isWhiteTurn);
        if (gameData.moveHistory) setMoveHistory(gameData.moveHistory);
        if (gameData.castlingRights) setCastlingRights(gameData.castlingRights);
        if (gameData.lastMove) setLastMove(gameData.lastMove);
      }
    } catch (error) {
      console.error("Error loading game state:", error);
    }
  }, [initialGameState]);

  const getGameState = (): string => {
    return JSON.stringify({
      board,
      isWhiteTurn,
      moveHistory,
      castlingRights,
      lastMove,
      timestamp: new Date().toISOString()
    });
  };

  // Update castling rights when rook is captured
  const updateCastlingRightsOnCapture = (capturedPos: ChessPosition, capturedPiece: ChessPiece) => {
    if (capturedPiece === 'R') {
      if (capturedPos.row === 7 && capturedPos.col === 0) {
        setCastlingRights(prev => ({ ...prev, whiteQueenSideRookMoved: true }));
      } else if (capturedPos.row === 7 && capturedPos.col === 7) {
        setCastlingRights(prev => ({ ...prev, whiteKingSideRookMoved: true }));
      }
    } else if (capturedPiece === 'r') {
      if (capturedPos.row === 0 && capturedPos.col === 0) {
        setCastlingRights(prev => ({ ...prev, blackQueenSideRookMoved: true }));
      } else if (capturedPos.row === 0 && capturedPos.col === 7) {
        setCastlingRights(prev => ({ ...prev, blackKingSideRookMoved: true }));
      }
    }
  };

  const makeAIMove = () => {
    if (isGameOver) {
      setAiThinking(false);
      return;
    }

    console.log("AI is thinking...");
    
    const bestMove = getBestMove(board, lastMove, castlingRights, moveCount);
    
    if (!bestMove) {
      if (isBlackInCheck) {
        setGameStatus("Checkmate! White wins.");
      } else {
        setGameStatus("Stalemate! Game is a draw.");
      }
      setIsGameOver(true);
      setAiThinking(false);
      return;
    }

    console.log(`AI selected move: ${files[bestMove.from.col]}${ranks[bestMove.from.row]} to ${files[bestMove.to.col]}${ranks[bestMove.to.row]}`);
    
    setMoveHistoryStack(prev => [...prev, {
      board: [...board.map(row => [...row])],
      isWhiteTurn: isWhiteTurn,
      move: {
        from: bestMove.from,
        to: bestMove.to,
        piece: board[bestMove.from.row][bestMove.from.col] as ChessPiece
      }
    }]);
    
    const piece = board[bestMove.from.row][bestMove.from.col];
    const capturedPiece = board[bestMove.to.row][bestMove.to.col];
    
    // Update castling rights if rook is captured
    if (capturedPiece !== ' ') {
      updateCastlingRightsOnCapture(bestMove.to, capturedPiece as ChessPiece);
    }
    
    // Handle special moves and make the move
    if (piece === 'p' && Math.abs(bestMove.from.row - bestMove.to.row) === 2) {
      setEnPassantTarget({
        row: (bestMove.from.row + bestMove.to.row) / 2,
        col: bestMove.to.col
      });
    } else {
      setEnPassantTarget(null);
    }
    
    const newBoard = makeMove(board, bestMove.from, bestMove.to);
    
    // AI promotion logic with some variety
    if (piece === 'p' && bestMove.to.row === 7) {
      // 90% queen, 10% other pieces for variety
      const promotionChoice = Math.random() < 0.9 ? 'q' : ['r', 'b', 'n'][Math.floor(Math.random() * 3)];
      newBoard[bestMove.to.row][bestMove.to.col] = promotionChoice as ChessPiece;
      
      setMoveHistory(prev => [...prev, {
        from: bestMove.from,
        to: bestMove.to,
        piece: 'p' as ChessPiece,
        specialMove: 'promotion',
        promotedTo: promotionChoice as ChessPiece
      }]);
    } else {
      setMoveHistory(prev => [...prev, {
        from: bestMove.from,
        to: bestMove.to,
        piece: board[bestMove.from.row][bestMove.from.col] as ChessPiece,
        captured: capturedPiece !== ' ' ? capturedPiece as ChessPiece : undefined
      }]);
    }
    
    if (piece === 'k') {
      setCastlingRights(prev => ({...prev, blackKingMoved: true}));
    } else if (piece === 'r') {
      if (bestMove.from.col === 0 && bestMove.from.row === 0) {
        setCastlingRights(prev => ({...prev, blackQueenSideRookMoved: true}));
      } else if (bestMove.from.col === 7 && bestMove.from.row === 0) {
        setCastlingRights(prev => ({...prev, blackKingSideRookMoved: true}));
      }
    }
    
    setBoard(newBoard);
    setLastMove({from: bestMove.from, to: bestMove.to, piece});
    setIsWhiteTurn(true);
    setMoveCount(prev => prev + 1);
    setAiThinking(false);
  };

  // Check for check, checkmate, and stalemate after each move
  useEffect(() => {
    const whiteInCheck = isCheck(board, true);
    const blackInCheck = isCheck(board, false);
    
    setIsWhiteInCheck(whiteInCheck);
    setIsBlackInCheck(blackInCheck);

    let status = "";
    if (isWhiteTurn) {
      status = "White to move";
      if (whiteInCheck) {
        if (isCheckmate(board, true)) {
          status = "Checkmate! Black wins.";
          setIsGameOver(true);
        } else {
          status = "White is in check!";
        }
      } else if (isStalemate(board, true)) {
        status = "Stalemate! Game is a draw.";
        setIsGameOver(true);
      }
    } else {
      status = "Black to move";
      if (blackInCheck) {
        if (isCheckmate(board, false)) {
          status = "Checkmate! White wins.";
          setIsGameOver(true);
        } else {
          status = "Black is in check!";
        }
      } else if (isStalemate(board, false)) {
        status = "Stalemate! Game is a draw.";
        setIsGameOver(true);
      }
    }

    setGameStatus(status);

    if (!isWhiteTurn && !isGameOver) {
      setAiThinking(true);
      // Clear any existing timeout
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current);
      }
      aiTimeoutRef.current = setTimeout(makeAIMove, 500); // Reduced delay
    }
  }, [board, isWhiteTurn]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current);
      }
    };
  }, []);

  const resetGame = () => {
    // Clear any existing AI timeout
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current);
    }
    
    setBoard(initialBoard);
    setSelectedPosition(null);
    setPossibleMoves([]);
    setIsWhiteTurn(true);
    setGameStatus("White to move");
    setMoveHistory([]);
    setMoveHistoryStack([]);
    setIsWhiteInCheck(false);
    setIsBlackInCheck(false);
    setIsGameOver(false);
    setLastMove(null);
    setEnPassantTarget(null);
    setMoveCount(0);
    setAiThinking(false);
    setCastlingRights({
      whiteKingMoved: false,
      whiteKingSideRookMoved: false,
      whiteQueenSideRookMoved: false,
      blackKingMoved: false,
      blackKingSideRookMoved: false,
      blackQueenSideRookMoved: false
    });
  };

  const undoMove = () => {
    // Clear any existing AI timeout
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current);
    }
    
    if (moveHistoryStack.length === 0) return;
    
    const lastState = moveHistoryStack.pop();
    if (lastState) {
      setBoard(lastState.board);
      setIsWhiteTurn(lastState.isWhiteTurn);
      setMoveHistory(prev => prev.slice(0, -1));
      setLastMove(null);
      setEnPassantTarget(null);
      setAiThinking(false);
      
      if (!lastState.isWhiteTurn && moveHistoryStack.length > 0) {
        const previousState = moveHistoryStack.pop();
        if (previousState) {
          setBoard(previousState.board);
          setIsWhiteTurn(previousState.isWhiteTurn);
          setMoveHistory(prev => prev.slice(0, -1));
          setLastMove(null);
          setEnPassantTarget(null);
          setMoveCount(prev => Math.max(0, prev - 2));
        }
      } else {
        setMoveCount(prev => Math.max(0, prev - 1));
      }
    }
  };

  const exportGame = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([getGameState()], {type: 'application/json'});
      element.href = URL.createObjectURL(file);
      element.download = `chess-game-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error("Error exporting game:", error);
    }
  };

  return {
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
  };
};
