
import { ChessBoard, ChessPosition, ChessPiece, isPieceBlack, isPieceWhite, getPieceValue } from '../ChessTypes';
import { makeMove } from '../logic/boardUtils';
import { isCheck, isCheckmate } from '../logic/gameState';
import { getValidMoves } from '../logic/moveValidation';

// Opening book for better early game play
const OPENING_MOVES = [
  // King's Pawn Opening
  { from: { row: 1, col: 4 }, to: { row: 3, col: 4 } }, // e7-e5
  // Queen's Pawn Defense
  { from: { row: 1, col: 3 }, to: { row: 3, col: 3 } }, // d7-d5
  // King's Knight
  { from: { row: 0, col: 6 }, to: { row: 2, col: 5 } }, // Ng8-f6
  // Queen's Knight
  { from: { row: 0, col: 1 }, to: { row: 2, col: 2 } }, // Nb8-c6
];

// Piece-square tables for positional evaluation
const PAWN_TABLE = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5,  5, 10, 25, 25, 10,  5,  5],
  [0,  0,  0, 20, 20,  0,  0,  0],
  [5, -5,-10,  0,  0,-10, -5,  5],
  [5, 10, 10,-20,-20, 10, 10,  5],
  [0,  0,  0,  0,  0,  0,  0,  0]
];

const KNIGHT_TABLE = [
  [-50,-40,-30,-30,-30,-30,-40,-50],
  [-40,-20,  0,  0,  0,  0,-20,-40],
  [-30,  0, 10, 15, 15, 10,  0,-30],
  [-30,  5, 15, 20, 20, 15,  5,-30],
  [-30,  0, 15, 20, 20, 15,  0,-30],
  [-30,  5, 10, 15, 15, 10,  5,-30],
  [-40,-20,  0,  5,  5,  0,-20,-40],
  [-50,-40,-30,-30,-30,-30,-40,-50]
];

const BISHOP_TABLE = [
  [-20,-10,-10,-10,-10,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5, 10, 10,  5,  0,-10],
  [-10,  5,  5, 10, 10,  5,  5,-10],
  [-10,  0, 10, 10, 10, 10,  0,-10],
  [-10, 10, 10, 10, 10, 10, 10,-10],
  [-10,  5,  0,  0,  0,  0,  5,-10],
  [-20,-10,-10,-10,-10,-10,-10,-20]
];

const ROOK_TABLE = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [5, 10, 10, 10, 10, 10, 10,  5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [0,  0,  0,  5,  5,  0,  0,  0]
];

const QUEEN_TABLE = [
  [-20,-10,-10, -5, -5,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5,  5,  5,  5,  0,-10],
  [-5,  0,  5,  5,  5,  5,  0, -5],
  [0,  0,  5,  5,  5,  5,  0, -5],
  [-10,  5,  5,  5,  5,  5,  0,-10],
  [-10,  0,  5,  0,  0,  0,  0,-10],
  [-20,-10,-10, -5, -5,-10,-10,-20]
];

const KING_MIDDLE_GAME_TABLE = [
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-20,-30,-30,-40,-40,-30,-30,-20],
  [-10,-20,-20,-20,-20,-20,-20,-10],
  [20, 20,  0,  0,  0,  0, 20, 20],
  [20, 30, 10,  0,  0, 10, 30, 20]
];

const KING_END_GAME_TABLE = [
  [-50,-40,-30,-20,-20,-30,-40,-50],
  [-30,-20,-10,  0,  0,-10,-20,-30],
  [-30,-10, 20, 30, 30, 20,-10,-30],
  [-30,-10, 30, 40, 40, 30,-10,-30],
  [-30,-10, 30, 40, 40, 30,-10,-30],
  [-30,-10, 20, 30, 30, 20,-10,-30],
  [-30,-30,  0,  0,  0,  0,-30,-30],
  [-50,-30,-30,-30,-30,-30,-30,-50]
];

// Get piece-square table value
const getPieceSquareValue = (piece: ChessPiece, row: number, col: number, isEndGame: boolean): number => {
  const isWhite = isPieceWhite(piece);
  const adjustedRow = isWhite ? 7 - row : row;
  
  switch (piece.toLowerCase()) {
    case 'p':
      return PAWN_TABLE[adjustedRow][col];
    case 'n':
      return KNIGHT_TABLE[adjustedRow][col];
    case 'b':
      return BISHOP_TABLE[adjustedRow][col];
    case 'r':
      return ROOK_TABLE[adjustedRow][col];
    case 'q':
      return QUEEN_TABLE[adjustedRow][col];
    case 'k':
      return isEndGame ? KING_END_GAME_TABLE[adjustedRow][col] : KING_MIDDLE_GAME_TABLE[adjustedRow][col];
    default:
      return 0;
  }
};

// Check if we're in endgame
const isEndGame = (board: ChessBoard): boolean => {
  let materialCount = 0;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece !== ' ' && piece.toLowerCase() !== 'k' && piece.toLowerCase() !== 'p') {
        materialCount += getPieceValue(piece);
      }
    }
  }
  return materialCount < 130; // Endgame threshold
};

// Find king position
const findKing = (board: ChessBoard, isWhite: boolean): ChessPosition | null => {
  const kingPiece = isWhite ? 'K' : 'k';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === kingPiece) {
        return { row, col };
      }
    }
  }
  return null;
};

// Calculate mobility (number of legal moves)
const getMobility = (board: ChessBoard, isWhite: boolean): number => {
  let mobility = 0;
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece !== ' ' && isPieceWhite(piece) === isWhite) {
        const moves = getValidMoves(board, { row, col }, isWhite);
        mobility += moves.length;
      }
    }
  }
  
  return mobility;
};

// Main evaluation function
export const evaluatePosition = (board: ChessBoard): number => {
  let score = 0;
  const endGame = isEndGame(board);
  
  // Material evaluation and piece-square tables
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece !== ' ') {
        const materialValue = getPieceValue(piece);
        const pieceSquareValue = getPieceSquareValue(piece, row, col, endGame);
        
        if (isPieceBlack(piece)) {
          score += materialValue + pieceSquareValue;
        } else {
          score -= materialValue + pieceSquareValue;
        }
      }
    }
  }
  
  // Mobility bonus
  score += getMobility(board, false) * 2 - getMobility(board, true) * 2;
  
  // Check bonus/penalty
  if (isCheck(board, true)) {
    score += 50;
  }
  if (isCheck(board, false)) {
    score -= 50;
  }
  
  // Checkmate evaluation
  if (isCheckmate(board, true)) {
    score += 10000;
  }
  if (isCheckmate(board, false)) {
    score -= 10000;
  }
  
  return score;
};

// Improved minimax with time management
export const minimax = (
  board: ChessBoard,
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean,
  startTime: number,
  timeLimit: number,
  lastMove?: { from: ChessPosition, to: ChessPosition, piece: string } | null,
  castlingRights?: any
): number => {
  // Time cutoff check
  if (Date.now() - startTime > timeLimit) {
    return evaluatePosition(board);
  }
  
  if (depth === 0) {
    return evaluatePosition(board);
  }
  
  // Get all pieces for current player
  const pieces: ChessPosition[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece !== ' ' && isPieceWhite(piece) !== maximizingPlayer) {
        pieces.push({ row, col });
      }
    }
  }
  
  if (maximizingPlayer) {
    let maxEval = -Infinity;
    
    for (const piecePos of pieces) {
      const validMoves = getValidMoves(board, piecePos, false, lastMove, castlingRights);
      
      for (const movePos of validMoves) {
        const newBoard = makeMove(board, piecePos, movePos);
        const eval_score = minimax(newBoard, depth - 1, alpha, beta, false, startTime, timeLimit, lastMove, castlingRights);
        maxEval = Math.max(maxEval, eval_score);
        alpha = Math.max(alpha, eval_score);
        
        if (beta <= alpha || Date.now() - startTime > timeLimit) {
          break; // Alpha-beta pruning or time cutoff
        }
      }
      
      if (beta <= alpha || Date.now() - startTime > timeLimit) {
        break;
      }
    }
    
    return maxEval;
  } else {
    let minEval = Infinity;
    
    for (const piecePos of pieces) {
      const validMoves = getValidMoves(board, piecePos, true, lastMove, castlingRights);
      
      for (const movePos of validMoves) {
        const newBoard = makeMove(board, piecePos, movePos);
        const eval_score = minimax(newBoard, depth - 1, alpha, beta, true, startTime, timeLimit, lastMove, castlingRights);
        minEval = Math.min(minEval, eval_score);
        beta = Math.min(beta, eval_score);
        
        if (beta <= alpha || Date.now() - startTime > timeLimit) {
          break; // Alpha-beta pruning or time cutoff
        }
      }
      
      if (beta <= alpha || Date.now() - startTime > timeLimit) {
        break;
      }
    }
    
    return minEval;
  }
};

// Get best move for AI with improved performance
export const getBestMove = (
  board: ChessBoard,
  lastMove?: { from: ChessPosition, to: ChessPosition, piece: string } | null,
  castlingRights?: any,
  moveCount: number = 0
): { from: ChessPosition, to: ChessPosition } | null => {
  const startTime = Date.now();
  const timeLimit = 2000; // 2 seconds maximum
  
  // Check opening book for first few moves
  if (moveCount < 4) {
    const availableOpeningMoves = OPENING_MOVES.filter(move => {
      const piece = board[move.from.row][move.from.col];
      return piece !== ' ' && isPieceBlack(piece);
    });
    
    if (availableOpeningMoves.length > 0) {
      const validOpeningMoves = availableOpeningMoves.filter(move => {
        const validMoves = getValidMoves(board, move.from, false, lastMove, castlingRights);
        return validMoves.some(validMove => validMove.row === move.to.row && validMove.col === move.to.col);
      });
      
      if (validOpeningMoves.length > 0) {
        return validOpeningMoves[Math.floor(Math.random() * validOpeningMoves.length)];
      }
    }
  }
  
  const blackPieces: ChessPosition[] = [];
  
  // Find all black pieces
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece !== ' ' && isPieceBlack(piece)) {
        blackPieces.push({ row, col });
      }
    }
  }
  
  const allMoves: { from: ChessPosition, to: ChessPosition, score: number }[] = [];
  
  // Generate all possible moves and evaluate them
  for (const piecePos of blackPieces) {
    const validMoves = getValidMoves(board, piecePos, false, lastMove, castlingRights);
    
    for (const movePos of validMoves) {
      const newBoard = makeMove(board, piecePos, movePos);
      
      // Use adaptive depth based on position complexity and time
      let depth = 2; // Reduced base depth for faster play
      
      // Increase depth for critical moves
      const piece = board[piecePos.row][piecePos.col];
      const targetPiece = board[movePos.row][movePos.col];
      
      if (targetPiece !== ' ' || isCheck(newBoard, true) || piece === 'q') {
        depth = 3; // Only go deeper for important moves
      }
      
      const score = minimax(newBoard, depth, -Infinity, Infinity, true, startTime, timeLimit, lastMove, castlingRights);
      allMoves.push({ from: piecePos, to: movePos, score });
      
      // Time check to prevent excessive computation
      if (Date.now() - startTime > timeLimit) {
        break;
      }
    }
    
    if (Date.now() - startTime > timeLimit) {
      break;
    }
  }
  
  if (allMoves.length === 0) {
    return null;
  }
  
  // Sort moves by score (best first)
  allMoves.sort((a, b) => b.score - a.score);
  
  // Add some randomness to top moves to avoid repetition
  const topMoves = allMoves.slice(0, Math.min(3, allMoves.length));
  const selectedMove = topMoves[Math.floor(Math.random() * topMoves.length)];
  
  console.log(`AI evaluation time: ${Date.now() - startTime}ms`);
  
  return selectedMove;
};
