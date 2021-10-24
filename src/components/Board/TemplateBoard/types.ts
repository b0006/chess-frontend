import * as ChessJS from 'chess.js';

export type ChessColor = 'b' | 'w';
export type PromotionPieceType = Exclude<ChessJS.PieceType, 'p' | 'k'>;
export type Board = Array<Array<{ type: ChessJS.PieceType; color: 'w' | 'b' } | null>>;

export type LegalMoves = {
  [key in ChessJS.Square]: ChessJS.Move;
};

export interface Props {
  isRotate?: boolean;
  stateChess: ChessJS.ChessInstance;
  myColor?: ChessColor;
  withAnimation?: boolean;
  isColoredMoves?: boolean;
  isRandom?: boolean;
  onMoveEnd?: () => void;
}

export interface UseMoves {
  stateChess: ChessJS.ChessInstance;
  resetCell: () => void;
  computedNewBoard: () => void;
}

export interface UseMovesReturn {
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType | undefined) => void;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType | undefined) => void;
  boardRef: React.RefObject<HTMLDivElement>;
  // myColor: ChessColor;
}

export interface UseRandom {
  stateChess: ChessJS.ChessInstance;
  withAnimation: boolean;
  isRandom: boolean;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
}
