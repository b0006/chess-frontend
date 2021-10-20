import React, { useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import * as ChessJS from 'chess.js';

import { HORIZONTAL_SYMBOLS, VERTICAL_SYMBOLS_REVERSE } from '../constants';
import { PromotionModal } from '../PromotionModal';

import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';
import { ICONS_DEFAULT, SvgIcon } from './icons';
import styles from './TemplateBoard.module.scss';
import { useRandomGame } from './useRandomGame.hook';

export type ChessColor = 'b' | 'w';
export type PromotionPieceType = Exclude<ChessJS.PieceType, 'p' | 'k'>;

type LegalMoves = {
  [key in ChessJS.Square]: ChessJS.Move;
};

interface IProps {
  isRotate?: boolean;
  stateChess: ChessJS.ChessInstance;
  myColor?: ChessColor;
  withAnimation?: boolean;
  isColoredMoves?: boolean;
  isRandom?: boolean;
}

const getCenterOfCell = (el: Element) => {
  const state = el.getBoundingClientRect();
  const x = state.left + state.width / 2;
  const y = state.top + state.height / 2;
  return { x, y };
};

let myColor: ChessColor = 'w';

const TemplateBoard: React.FC<IProps> = ({
  stateChess,
  isRotate,
  withAnimation = true,
  isColoredMoves = true,
  isRandom = false,
  // myColor = 'w',
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const [isVisiblePromotion, setIsVisiblePromotion] = useState(false);
  const [legalMoves, setLegalMoves] = useState<LegalMoves | Record<string, never>>({});
  const [board, setBoard] = useState(stateChess.board());
  const [squareActive, setSquareActive] = useState<ChessJS.Square | null>(null);
  const [squareTo, setSquareTo] = useState<{ from: ChessJS.Square | null; to: ChessJS.Square | null }>({
    from: null,
    to: null,
  });

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
    const legalMovesData = moves.reduce((result, move) => ({ ...result, [move.to]: move }), {});
    setLegalMoves(legalMovesData);
  };

  const animationMove = useCallback(
    (from: ChessJS.Square, to: ChessJS.Square, isPromotion?: boolean) => {
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

        if (!isPromotion) {
          setTimeout(() => {
            stateChess.move({ from, to });
            setBoard(stateChess.board());

            // TEMP
            myColor = myColor === 'b' ? 'w' : 'b';
          }, 250);
        }
      }
    },
    [stateChess]
  );

  const staticMove = useCallback(
    (from: ChessJS.Square, to: ChessJS.Square, isPromotion?: boolean) => {
      stateChess.move({ from, to });
      setBoard(stateChess.board());
      resetCell();
      // TEMP
      if (!isPromotion) {
        myColor = myColor === 'b' ? 'w' : 'b';
      }
    },
    [stateChess]
  );

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

      withAnimation ? animationMove(squareActive, square, isPromotion) : staticMove(squareActive, square, isPromotion);
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
      setBoard(stateChess.board());
      // TEMP
      myColor = myColor === 'b' ? 'w' : 'b';
    }
  };

  useRandomGame({ isRandom, stateChess, staticMove, animationMove, withAnimation });

  return (
    <React.Fragment>
      <div className={styles.chessboard}>
        <div className={cn(styles.inner, { [styles['inner--rotate']]: isRotate })}>
          <HorizontalSymbols isRotate={isRotate} />
          <div className={styles.game}>
            <VerticalSymbols isRotate={isRotate} />
            <div className={styles.board} ref={boardRef}>
              {HORIZONTAL_SYMBOLS.map((sym, symIndex) => {
                return (
                  <div key={sym} className={styles.row}>
                    {VERTICAL_SYMBOLS_REVERSE.map((_, digitindex) => {
                      const id =
                        `${HORIZONTAL_SYMBOLS[digitindex]}${VERTICAL_SYMBOLS_REVERSE[symIndex]}` as ChessJS.Square;
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
                            [styles['cell--no-events']]: isRandom,
                            [styles['cell--move']]: isColoredMoves && legalMoves[id],
                            [styles['cell--active']]: squareActive === id,
                            [styles['cell--rotate']]: isRotate,
                            [styles['cell--light']]: (symIndex + digitindex) % 2 === 0,
                            [styles['cell--dark']]: (symIndex + digitindex) % 2 !== 0,
                          })}
                        >
                          {Icon && <Icon className={styles.icon} />}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <VerticalSymbols isRotate={isRotate} />
          </div>
          <HorizontalSymbols isRotate={isRotate} />
        </div>
      </div>
      <PromotionModal
        isVisible={isVisiblePromotion}
        onChooseFigure={onChooseFigure}
        color={myColor}
        onClose={() => setIsVisiblePromotion(false)}
      />
    </React.Fragment>
  );
};

export { TemplateBoard };
