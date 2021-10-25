import * as ChessJS from 'chess.js';

import { GameData } from '../../../mobx/gameStore';

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

export interface UseMovesReturn {
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType | undefined) => void;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType | undefined) => void;
  boardRef: React.RefObject<HTMLDivElement>;
}

export interface UseRandom {
  stateChess: ChessJS.ChessInstance;
  withAnimation: boolean;
  isRandom: boolean;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
}

export type MoveData = {
  [key in string]: ChessJS.Move;
};

export interface UseAiParty {
  myColor: ChessColor;
  versusAi: boolean;
  difficult: number | null;
  stateChess: ChessJS.ChessInstance;
  withAnimation: boolean;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
}

export interface ChessEngine {
  postMessage: (line: string) => void;
  onmessage: (event: string) => void;
}
