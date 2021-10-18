import * as ChessJS from 'chess.js';

export type TChessColor = 'b' | 'w';

export interface IChessItemState {
  type: ChessJS.PieceType;
  color: TChessColor;
}

export type TChessBoard = (IChessItemState | null)[][];

export interface IMovesOptions {
  verbose?: boolean;
  square?: ChessJS.Square;
}

export type TMovesReturn = ChessJS.Move[] | string[];

export type TMoves = (options: IMovesOptions) => TMovesReturn;
