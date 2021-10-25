import { useCallback, useRef, useEffect } from 'react';
import * as ChessJS from 'chess.js';

import { PromotionPieceType, UseMoves, UseMovesReturn, CastlingMove } from './types';

const getCenterOfCell = (el: Element) => {
  const state = el.getBoundingClientRect();
  const x = state.left + state.width / 2;
  const y = state.top + state.height / 2;
  return { x, y };
};

const setAnimationPiece = (
  from: ChessJS.Square,
  to: ChessJS.Square,
  boardEl?: Element | null,
  callback?: () => void
) => {
  const fromCellEl = boardEl?.querySelector<HTMLElement>(`#${from}`);
  const toCellEl = boardEl?.querySelector<HTMLElement>(`#${to}`);

  let timeoutId: NodeJS.Timeout | null = null;

  if (fromCellEl && toCellEl) {
    const { x: fromX, y: fromY } = getCenterOfCell(fromCellEl);
    const { x: toX, y: toY } = getCenterOfCell(toCellEl);

    const x = toX - fromX;
    const y = toY - fromY;

    const pieceEl = fromCellEl?.firstChild as HTMLElement;
    if (!pieceEl) {
      return timeoutId;
    }

    pieceEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    pieceEl.style.zIndex = `11`;

    timeoutId = setTimeout(() => {
      if (typeof callback === 'function') {
        callback();
      }
    }, 250);
  }

  return timeoutId;
};

const useMoves = ({ stateChess, computedNewBoard, resetCell }: UseMoves): UseMovesReturn => {
  const boardRef = useRef<HTMLDivElement>(null);
  const moveTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const moveTimeoutId2Ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (moveTimeoutIdRef.current) {
        clearTimeout(moveTimeoutIdRef.current);
      }

      if (moveTimeoutId2Ref.current) {
        clearTimeout(moveTimeoutId2Ref.current);
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

  const animationCastlingMove = useCallback(
    (pieceOne: CastlingMove, pieceTwo: CastlingMove, promotion?: PromotionPieceType) => {
      resetCell();
      moveTimeoutIdRef.current = setAnimationPiece(pieceOne.from, pieceOne.to, boardRef.current, () => {
        stateChess.move({ from: pieceOne.from, to: pieceOne.to, promotion });
        computedNewBoard();
      });

      moveTimeoutId2Ref.current = setAnimationPiece(pieceTwo.from, pieceTwo.to, boardRef.current, () => {
        stateChess.move({ from: pieceTwo.from, to: pieceTwo.to, promotion });
        computedNewBoard();
      });
    },
    [computedNewBoard, resetCell, stateChess]
  );

  const animationMove = useCallback(
    (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => {
      resetCell();
      moveTimeoutIdRef.current = setAnimationPiece(from, to, boardRef.current, () => {
        stateChess.move({ from, to, promotion });
        computedNewBoard();
      });
    },
    [computedNewBoard, resetCell, stateChess]
  );

  return { staticMove, animationMove, animationCastlingMove, boardRef };
};

export { useMoves };
