import React from 'react';
import cn from 'classnames';

import { HORIZONTAL_SYMBOLS, VERTICAL_SYMBOLS_REVERSE } from '../constants';
import { TChessBoard } from '../Chessboard/types';

import { ICONS_DEFAULT, SvgIcon } from './icons';

interface IProps {
  isRotate: boolean;
  board: TChessBoard;
}

const GameBoard: React.FC<IProps> = ({ isRotate, board }) => {
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
                  key={id}
                  id={id}
                  className={cn('chessboard__cell', {
                    'chessboard__cell--rotate': isRotate,
                    'chessboard__cell--light': (symIndex + digitindex) % 2 === 0,
                    'chessboard__cell--dark': (symIndex + digitindex) % 2 !== 0,
                  })}
                >
                  {Icon && <Icon className="chessboard__icon" />}
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
