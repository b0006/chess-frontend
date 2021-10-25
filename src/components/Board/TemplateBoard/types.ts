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
  versusAi?: boolean;
  difficult?: number | null;
  isRandom?: boolean;
}

export interface UseMoves {
  stateChess: ChessJS.ChessInstance;
  resetCell: () => void;
  computedNewBoard: () => void;
}

export interface MoveMethods {
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
}

export interface UseMovesReturn extends MoveMethods {
  boardRef: React.RefObject<HTMLDivElement>;
}

export interface UseRandom extends MoveMethods {
  stateChess: ChessJS.ChessInstance;
  withAnimation: boolean;
  isRandom: boolean;
}

export type MoveData = {
  [key in string]: ChessJS.Move;
};

export interface UseAiParty extends MoveMethods {
  myColor: ChessColor;
  versusAi: boolean;
  difficult: number | null;
  stateChess: ChessJS.ChessInstance;
  withAnimation: boolean;
}

export interface ChessEngine {
  postMessage: (line: string) => void;
  onmessage: (event: string) => void;
}
