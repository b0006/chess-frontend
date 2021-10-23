import { useCallback, useRef } from 'react';
import * as ChessJS from 'chess.js';

import { PromotionPieceType, UseMoves, UseMovesReturn } from './types';

const getCenterOfCell = (el: Element) => {
  const state = el.getBoundingClientRect();
  const x = state.left + state.width / 2;
  const y = state.top + state.height / 2;
  return { x, y };
};

const useMoves = ({ stateChess, computedNewBoard, resetCell }: UseMoves): UseMovesReturn => {
  // TEMP myColor при реальной игре не нужно изменять
  // const [myColor, setMyColor] = useState<ChessColor>('w');

  const boardRef = useRef<HTMLDivElement>(null);

  const staticMove = useCallback(
    (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => {
      stateChess.move({ from, to, promotion });
      computedNewBoard();
      resetCell();
      // TEMP
      // if (!promotion) {
      //   setMyColor((prevColor) => (prevColor === 'b' ? 'w' : 'b'));
      // }
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

        setTimeout(() => {
          stateChess.move({ from, to, promotion });
          computedNewBoard();

          // TEMP
          // setMyColor((prevColor) => (prevColor === 'b' ? 'w' : 'b'));
        }, 250);
      }
    },
    [computedNewBoard, resetCell, stateChess]
  );

  return { staticMove, animationMove, boardRef };
};

export { useMoves };
