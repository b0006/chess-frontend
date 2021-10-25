import { useCallback, useEffect, useRef, useState } from 'react';
import * as ChessJS from 'chess.js';

import { ChessColor, LegalMoves, PromotionPieceType, UseUserActions, UseUserActionsReturn } from './types';

const getCenterOfCell = (el: Element) => {
  const state = el.getBoundingClientRect();
  const x = state.left + state.width / 2;
  const y = state.top + state.height / 2;
  return { x, y };
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

  const boardRef = useRef<HTMLDivElement>(null);
  const moveTimeoutIdRef = useRef<NodeJS.Timeout>();

  const resetCell = useCallback(() => {
    setSquareActive(null);
    setLegalMoves({});
  }, []);

  useEffect(() => {
    return () => {
      if (moveTimeoutIdRef.current) {
        clearTimeout(moveTimeoutIdRef.current);
      }
    };
  }, []);

  const staticMove = useCallback(
    (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => {
      stateChess.move({ from, to, promotion });
      computedNewBoard();
      resetCell();
    },
    [stateChess, computedNewBoard, resetCell]
  );

  const animationMove = useCallback(
    (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => {
      resetCell();
      const fromCellEl = boardRef.current?.querySelector<HTMLElement>(`#${from}`);
      const toCellEl = boardRef.current?.querySelector<HTMLElement>(`#${to}`);

      if (fromCellEl && toCellEl) {
        const { x: fromX, y: fromY } = getCenterOfCell(fromCellEl);
        const { x: toX, y: toY } = getCenterOfCell(toCellEl);

        const x = toX - fromX;
        const y = toY - fromY;

        const pieceEl = fromCellEl?.firstChild as HTMLElement;
        if (!pieceEl) {
          return;
        }

        pieceEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        pieceEl.style.zIndex = `11`;

        moveTimeoutIdRef.current = setTimeout(() => {
          stateChess.move({ from, to, promotion });
          computedNewBoard();
        }, 250);
      }
    },
    [computedNewBoard, resetCell, stateChess]
  );

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

  return { legalMoves, squareActive, staticMove, animationMove, onClickCell, onChooseFigure, boardRef };
};

export { useUserActions };
