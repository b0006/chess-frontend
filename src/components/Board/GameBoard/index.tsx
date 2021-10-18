import React, { useState } from 'react';
import cn from 'classnames';

import { HORIZONTAL_SYMBOLS, VERTICAL_SYMBOLS_REVERSE } from '../constants';
import { TChessBoard, TChessColor, TMoves } from '../Chessboard/types';

import { ICONS_DEFAULT, SvgIcon } from './icons';

interface IProps {
  isRotate: boolean;
  board: TChessBoard;
  getLegalMoves: TMoves;
  getTurn: () => TChessColor;
  setMove: any;
}

const GameBoard: React.FC<IProps> = ({ isRotate, board, getLegalMoves, getTurn, setMove }) => {
  const [legalMoves, setLegalMoves] = useState<any>({});
  const [squareActive, setSquareActive] = useState('');

  const resetCell = () => {
    setSquareActive('');
    setLegalMoves({});
  };

  const onPieceClick = (square: string, color: TChessColor) => () => {
    // деактивируем ранее активную ячейку
    if (squareActive === square) {
      resetCell();
      return;
    }

    // Активируем ячейку и проверяем возможные ходы
    const actualTurn = getTurn();
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

  const onLegalCell = (square: string) => {
    setMove({ from: squareActive, to: square });
    resetCell();
  };

  return (
    <div className="chessboard__board">
      {HORIZONTAL_SYMBOLS.map((sym, symIndex) => {
        return (
          <div key={sym} className="chessboard__row">
            {VERTICAL_SYMBOLS_REVERSE.map((_, digitindex) => {
              const id = `${HORIZONTAL_SYMBOLS[digitindex]}${VERTICAL_SYMBOLS_REVERSE[symIndex]}`;
              const cellItem = board[symIndex] ? board[symIndex][digitindex] : null;

              const Icon: SvgIcon = cellItem ? ICONS_DEFAULT[cellItem.color][cellItem.type] : null;

              return (
                <div
                  onClick={() => legalMoves[id] && onLegalCell(id)}
                  key={id}
                  id={id}
                  className={cn('chessboard__cell', {
                    'chessboard__cell--move': legalMoves[id],
                    'chessboard__cell--active': squareActive === id,
                    'chessboard__cell--rotate': isRotate,
                    'chessboard__cell--light': (symIndex + digitindex) % 2 === 0,
                    'chessboard__cell--dark': (symIndex + digitindex) % 2 !== 0,
                  })}
                >
                  {Icon && cellItem && (
                    <button className="chessboard__button" type="button" onClick={onPieceClick(id, cellItem.color)}>
                      <Icon className="chessboard__icon" />
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
