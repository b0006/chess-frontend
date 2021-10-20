import React, { useState, useRef } from 'react';
import cn from 'classnames';
import * as ChessJS from 'chess.js';

import { HORIZONTAL_SYMBOLS, VERTICAL_SYMBOLS_REVERSE } from '../constants';
import { ICONS_DEFAULT, SvgIcon } from '../GameBoard/icons';

import styles from './TemplateBoard.module.scss';

type ChessColor = 'b' | 'w';

type LegalMoves = {
  [key in ChessJS.Square]: ChessJS.Square;
};

interface IProps {
  isRotate?: boolean;
  stateChess: ChessJS.ChessInstance;
  isNoEvents?: boolean;
  myColor?: ChessColor;
  withAnimation?: boolean;
}

const getCenterOfCell = (el: Element) => {
  const state = el.getBoundingClientRect();
  const x = state.left + state.width / 2;
  const y = state.top + state.height / 2;
  return { x, y };
};

// let myColor = 'w';

const TemplateBoard: React.FC<IProps> = ({
  stateChess,
  isRotate,
  withAnimation = true,
  isNoEvents = false,
  myColor = 'w',
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const [legalMoves, setLegalMoves] = useState<LegalMoves | Record<string, never>>({});
  const [board, setBoard] = useState(stateChess.board());
  const [squareActive, setSquareActive] = useState<ChessJS.Square | null>(null);

  const resetCell = () => {
    setSquareActive(null);
    setLegalMoves({});
  };

  const setActiveCell = (square: ChessJS.Square) => {
    if (squareActive === square) {
      resetCell();
      return;
    }

    setSquareActive(square);

    const moves = stateChess.moves({ square, verbose: true });
    const legalMovesData = moves.reduce((result, move) => ({ ...result, [move.to]: move.to }), {});
    setLegalMoves(legalMovesData);
  };

  const onClickCell = (square: ChessJS.Square, color?: ChessColor, piece?: ChessJS.PieceType) => () => {
    const actualTurn = stateChess.turn();
    if (myColor !== actualTurn) {
      return;
    }

    if ((!legalMoves[square] && !piece) || (piece && color !== myColor)) {
      resetCell();
      return;
    }

    if (legalMoves[square] && squareActive) {
      if (withAnimation) {
        resetCell();
        const fromCellEl = boardRef.current?.querySelector<HTMLElement>(`#${squareActive}`);
        const toCellEl = boardRef.current?.querySelector<HTMLElement>(`#${square}`);

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

          setTimeout(() => {
            stateChess.move({ from: squareActive, to: square });
            setBoard(stateChess.board());

            // // TEMP
            // myColor = myColor === 'b' ? 'w' : 'b';
          }, 250);
        }

        return;
      }

      stateChess.move({ from: squareActive, to: square });
      setBoard(stateChess.board());
      resetCell();
      // // TEMP
      // myColor = myColor === 'b' ? 'w' : 'b';
      return;
    }

    if (myColor === color && piece) {
      setActiveCell(square);
    }
  };

  return (
    <div className={styles.board} ref={boardRef}>
      {HORIZONTAL_SYMBOLS.map((sym, symIndex) => {
        return (
          <div key={sym} className={styles.row}>
            {VERTICAL_SYMBOLS_REVERSE.map((_, digitindex) => {
              const id = `${HORIZONTAL_SYMBOLS[digitindex]}${VERTICAL_SYMBOLS_REVERSE[symIndex]}` as ChessJS.Square;
              const cellItem = board[symIndex] ? board[symIndex][digitindex] : null;

              const Icon: SvgIcon = cellItem ? ICONS_DEFAULT[cellItem.color][cellItem.type] : null;

              return (
                <div
                  tabIndex={0}
                  onKeyDown={onClickCell(id, cellItem?.color, cellItem?.type)}
                  onClick={onClickCell(id, cellItem?.color, cellItem?.type)}
                  key={id}
                  id={id}
                  className={cn(styles.cell, {
                    [styles['cell--no-events']]: isNoEvents,
                    [styles['cell--move']]: legalMoves[id],
                    [styles['cell--active']]: squareActive === id,
                    [styles['cell--rotate']]: isRotate,
                    [styles['cell--light']]: (symIndex + digitindex) % 2 === 0,
                    [styles['cell--dark']]: (symIndex + digitindex) % 2 !== 0,
                  })}
                >
                  {Icon && cellItem && <Icon className={styles.icon} />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export { TemplateBoard };
