import { useState } from 'react';
import * as ChessJS from 'chess.js';

import { ChessColor, LegalMoves, MoveMethods, PromotionPieceType } from './types';

interface UseUserActions extends MoveMethods {
  stateChess: ChessJS.ChessInstance;
  legalMoves: LegalMoves | Record<string, never>;
  setLegalMoves: React.Dispatch<React.SetStateAction<LegalMoves | Record<string, never>>>;
  isRandom: boolean;
  myColor: ChessColor;
  withAnimation: boolean;
  computedNewBoard: () => void;
  setIsVisiblePromotion: React.Dispatch<React.SetStateAction<boolean>>;
  resetCell: () => void;
  squareActive: ChessJS.Square | null;
  setSquareActive: React.Dispatch<React.SetStateAction<ChessJS.Square | null>>;
}

const useUserActions = ({
  isRandom,
  stateChess,
  myColor,
  legalMoves,
  setLegalMoves,
  withAnimation,
  animationMove,
  staticMove,
  computedNewBoard,
  setIsVisiblePromotion,
  resetCell,
  squareActive,
  setSquareActive,
}: UseUserActions): {
  onClickCell: (
    square: ChessJS.Square,
    color?: ChessColor | undefined,
    piece?: ChessJS.PieceType | undefined
  ) => () => void;
  onChooseFigure: (pieceType: PromotionPieceType) => void;
} => {
  const [squareTo, setSquareTo] = useState<{ from: ChessJS.Square | null; to: ChessJS.Square | null }>({
    from: null,
    to: null,
  });

  const setActiveCell = (square: ChessJS.Square) => {
    if (squareActive === square) {
      resetCell();
      return;
    }

    setSquareActive(square);

    const moves = stateChess.moves({ square, verbose: true });
    const legalMovesData = moves.reduce((result, move) => ({ ...result, [move.to]: move }), {});
    setLegalMoves(legalMovesData);
  };

  const onClickCell = (square: ChessJS.Square, color?: ChessColor, piece?: ChessJS.PieceType) => () => {
    if (isRandom) {
      return;
    }

    const actualTurn = stateChess.turn();
    if (myColor !== actualTurn) {
      return;
    }

    if ((!legalMoves[square] && !piece) || (!legalMoves[square] && piece && color !== myColor)) {
      resetCell();
      return;
    }

    if (legalMoves[square] && squareActive) {
      const isPromotion = Boolean(legalMoves[square].promotion);

      if (isPromotion) {
        setIsVisiblePromotion(true);
        setSquareTo({ from: squareActive, to: square });
      }

      withAnimation ? animationMove(squareActive, square) : staticMove(squareActive, square);
      return;
    }

    if (myColor === color && piece) {
      setActiveCell(square);
    }
  };

  const onChooseFigure = (pieceType: PromotionPieceType) => {
    if (squareTo.from && squareTo.to) {
      stateChess.move({ from: squareTo.from, to: squareTo.to, promotion: pieceType });
      setSquareTo({ from: null, to: null });
      computedNewBoard();
    }
  };

  return { onClickCell, onChooseFigure };
};

export { useUserActions };
