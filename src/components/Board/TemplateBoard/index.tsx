import React, { useState, useCallback, useEffect, useRef } from 'react';
import cn from 'classnames';
import * as ChessJS from 'chess.js';

import {
  HORIZONTAL_SYMBOLS,
  HORIZONTAL_SYMBOLS_REVERSE,
  VERTICAL_SYMBOLS,
  VERTICAL_SYMBOLS_REVERSE,
} from '../constants';
import { PromotionModal } from '../PromotionModal';
import { Popup } from '../../Common/Popup';

import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';
import { ICONS_DEFAULT } from './icons';
import styles from './TemplateBoard.module.scss';
import { useRandomGame } from './useRandomGame.hook';
import { Props, ChessColor, LegalMoves, Board, PromotionPieceType } from './types';
import { useAiParty } from './useAiParty.hook';

const getCenterOfCell = (el: Element) => {
  const state = el.getBoundingClientRect();
  const x = state.left + state.width / 2;
  const y = state.top + state.height / 2;
  return { x, y };
};

// TEMP
// let myColor: ChessColor = 'w';

const TemplateBoard: React.FC<Props> = ({
  stateChess,
  isRotate,
  withAnimation = true,
  isColoredMoves = true,
  isRandom = false,
  myColor = 'w',
  game,
  // onMoveEnd,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const moveTimeoutIdRef = useRef<NodeJS.Timeout>();

  const [isVisibleGameOver, setIsVisibleGameOver] = useState(false);
  const [isVisiblePromotion, setIsVisiblePromotion] = useState(false);
  const [legalMoves, setLegalMoves] = useState<LegalMoves | Record<string, never>>({});
  const [board, setBoard] = useState<Board>([]);
  const [squareActive, setSquareActive] = useState<ChessJS.Square | null>(null);
  const [squareTo, setSquareTo] = useState<{ from: ChessJS.Square | null; to: ChessJS.Square | null }>({
    from: null,
    to: null,
  });

  const { onMoveEnd } = useAiParty({ stateChess, game });

  const resetCell = () => {
    setSquareActive(null);
    setLegalMoves({});
  };

  const computedNewBoard = useCallback(() => {
    const newBoard = stateChess.board();
    setBoard(() => {
      return isRotate ? [...newBoard].reverse().map((row) => [...row].reverse()) : newBoard;
    });
  }, [isRotate, stateChess]);

  useEffect(() => {
    computedNewBoard();

    return () => {
      if (moveTimeoutIdRef.current) {
        clearTimeout(moveTimeoutIdRef.current);
      }
    };
  }, [computedNewBoard]);

  const staticMove = useCallback(
    (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => {
      stateChess.move({ from, to, promotion });
      computedNewBoard();
      resetCell();

      if (typeof onMoveEnd === 'function') {
        onMoveEnd();
      }
      // // TEMP
      // if (!promotion) {
      //   myColor = myColor === 'b' ? 'w' : 'b';
      // }
    },
    [stateChess, computedNewBoard, onMoveEnd]
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

          if (typeof onMoveEnd === 'function') {
            onMoveEnd();
          }

          // // TEMP
          // myColor = myColor === 'b' ? 'w' : 'b';
        }, 250);
      }
    },
    [computedNewBoard, stateChess, onMoveEnd]
  );

  useRandomGame({ isRandom, stateChess, staticMove, animationMove, withAnimation });

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

  useEffect(() => {
    if (stateChess.game_over() && !isRandom) {
      setIsVisibleGameOver(true);
    }
  }, [board, stateChess, isRandom]);

  const horList = isRotate ? HORIZONTAL_SYMBOLS_REVERSE : HORIZONTAL_SYMBOLS;
  const verList = isRotate ? VERTICAL_SYMBOLS : VERTICAL_SYMBOLS_REVERSE;

  return (
    <React.Fragment>
      <div className={styles.chessboard}>
        <div className={styles.inner}>
          <HorizontalSymbols isRotate={isRotate} />
          <div className={styles.game}>
            <VerticalSymbols isRotate={isRotate} />
            <div className={styles.board} ref={boardRef}>
              {horList.map((sym, symIndex) => {
                return (
                  <div key={sym} className={styles.row}>
                    {verList.map((_, digitindex) => {
                      const id = `${horList[digitindex]}${verList[symIndex]}` as ChessJS.Square;
                      const cellItem = board[symIndex] ? board[symIndex][digitindex] : null;

                      const Icon = cellItem ? ICONS_DEFAULT[cellItem.color][cellItem.type] : null;

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
      <Popup
        title="Game over"
        description="kurwa"
        isVisible={isVisibleGameOver}
        onClose={() => setIsVisibleGameOver(false)}
      />
    </React.Fragment>
  );
};

export { TemplateBoard };
