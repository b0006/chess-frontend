import React, { useState } from 'react';
import * as ChessJS from 'chess.js';
import cn from 'classnames';

import { HORIZONTAL_SYMBOLS, VERTICAL_SYMBOLS_REVERSE } from '../constants';
import { TChessBoard, TChessColor, TMoves } from '../Wrapper/types';

import { ICONS_DEFAULT, SvgIcon } from './icons';
import styles from './GameBoard.module.scss';

interface IProps {
  isRotate?: boolean;
  board: TChessBoard;
  getLegalMoves: TMoves;
  getTurn: () => TChessColor;
  setMove: (move: ChessJS.ShortMove) => void;
}

const GameBoard: React.FC<IProps> = ({ isRotate, board, getLegalMoves, getTurn, setMove }) => {
  const [legalMoves, setLegalMoves] = useState<any>({});
  const [squareActive, setSquareActive] = useState<ChessJS.Square | null>(null);

  const resetCell = () => {
    setSquareActive(null);
    setLegalMoves({});
  };

  const onPieceClick = (square: ChessJS.Square, color: TChessColor) => () => {
    const actualTurn = getTurn();

    // деактивируем ранее активную ячейку
    if (squareActive === square || actualTurn !== color) {
      resetCell();
      return;
    }

    // Активируем ячейку и проверяем возможные ходы
    if (actualTurn === color) {
      setSquareActive(square);

      const legal = getLegalMoves({ verbose: true, square });
      const legalData = [...legal].reduce((result, move) => {
        if (typeof move !== 'string') {
          return {
            ...result,
            [move.to]: move,
          };
        }

        return result;
      }, {});

      setLegalMoves(legalData);
    }
  };

  const onClickCell = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
    square: ChessJS.Square,
    isEmpty: boolean
  ) => {
    if (legalMoves[square] && squareActive) {
      event.preventDefault();
      if (legalMoves[square].promotion) {
        setMove({ from: squareActive, to: square, promotion: 'b' });
        resetCell();
        return;
      }
      setMove({ from: squareActive, to: square });
      resetCell();
    }

    if (isEmpty) {
      event.preventDefault();
      resetCell();
    }
  };

  return (
    <div className={styles.board}>
      {HORIZONTAL_SYMBOLS.map((sym, symIndex) => {
        return (
          <div key={sym} className={styles.row}>
            {VERTICAL_SYMBOLS_REVERSE.map((_, digitindex) => {
              const id = `${HORIZONTAL_SYMBOLS[digitindex]}${VERTICAL_SYMBOLS_REVERSE[symIndex]}` as ChessJS.Square;
              const cellItem = board[symIndex] ? board[symIndex][digitindex] : null;

              const Icon: SvgIcon = cellItem ? ICONS_DEFAULT[cellItem.color][cellItem.type] : null;

              const _onClickCell = (
                event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>
              ) => onClickCell(event, id, !Icon);

              return (
                <div
                  tabIndex={0}
                  onKeyDown={_onClickCell}
                  onClick={_onClickCell}
                  key={id}
                  id={id}
                  className={cn(styles.cell, {
                    [styles['cell--move']]: legalMoves[id],
                    [styles['cell--active']]: squareActive === id,
                    [styles['cell--rotate']]: isRotate,
                    [styles['cell--light']]: (symIndex + digitindex) % 2 === 0,
                    [styles['cell--dark']]: (symIndex + digitindex) % 2 !== 0,
                  })}
                >
                  {Icon && cellItem && (
                    <button className={styles.button} type="button" onClick={onPieceClick(id, cellItem.color)}>
                      <Icon className={styles.icon} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export { GameBoard };
