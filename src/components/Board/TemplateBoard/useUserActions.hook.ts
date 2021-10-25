import { useCallback, useState } from 'react';
import * as ChessJS from 'chess.js';

import {
  CastlingMove,
  ChessColor,
  LegalMoves,
  PromotionPieceType,
  UseUserActions,
  UseUserActionsReturn,
} from './types';
import { useMoves } from './useMove.hook';

const getPieceTwo = (
  moveColor: ChessColor,
  isCastlingKingSide: boolean,
  isCastlingQueenSide: boolean
): CastlingMove => {
  if (moveColor === 'w') {
    return {
      from: isCastlingKingSide ? 'h1' : 'a1',
      to: isCastlingQueenSide ? 'd1' : 'f1',
    };
  }

  return {
    from: isCastlingKingSide ? 'h8' : 'a8',
    to: isCastlingQueenSide ? 'd8' : 'f8',
  };
};

const useUserActions = ({
  isRandom,
  stateChess,
  myColor,
  withAnimation,
  computedNewBoard,
  setIsVisiblePromotion,
}: UseUserActions): UseUserActionsReturn => {
  const [squareActive, setSquareActive] = useState<ChessJS.Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<LegalMoves | Record<string, never>>({});
  const [squareTo, setSquareTo] = useState<{ from: ChessJS.Square | null; to: ChessJS.Square | null }>({
    from: null,
    to: null,
  });

  const resetCell = useCallback(() => {
    setSquareActive(null);
    setLegalMoves({});
  }, []);

  const { staticMove, animationMove, animationCastlingMove, boardRef } = useMoves({
    stateChess,
    resetCell,
    computedNewBoard,
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

      const isCastlingQueenSide = legalMoves[square].san === 'O-O-O';
      const isCastlingKingSide = legalMoves[square].san === 'O-O';
      if (isCastlingQueenSide || isCastlingKingSide) {
        const pieceOne = { from: legalMoves[square].from, to: legalMoves[square].to };
        const pieceTwo = getPieceTwo(legalMoves[square].color, isCastlingKingSide, isCastlingQueenSide);

        withAnimation
          ? animationCastlingMove(pieceOne, pieceTwo, legalMoves[square].promotion)
          : staticMove(squareActive, square);
        return;
      }

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

  return { legalMoves, squareActive, staticMove, animationMove, onClickCell, onChooseFigure, boardRef };
};

export { useUserActions };
