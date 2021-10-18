import React from 'react';
import cn from 'classnames';
import * as ChessJS from 'chess.js';

import { HORIZONTAL_SYMBOLS, VERTICAL_SYMBOLS_REVERSE } from '../constants';
import { TChessBoard, TChessColor, TMoves } from '../Chessboard/types';

import { ICONS_DEFAULT, SvgIcon } from './icons';

interface IProps {
  isRotate: boolean;
  board: TChessBoard;
  getLegalMoves: TMoves;
}

const GameBoard: React.FC<IProps> = ({ isRotate, board, getLegalMoves }) => {
  const onPieceClick = (id: string, color: TChessColor, pieceType: ChessJS.PieceType) => () => {
    console.log(id, color, pieceType);
    const legal = getLegalMoves({ verbose: true, square: id });
    console.log(legal);
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
                  key={id}
                  id={id}
                  className={cn('chessboard__cell', {
                    'chessboard__cell--rotate': isRotate,
                    'chessboard__cell--light': (symIndex + digitindex) % 2 === 0,
                    'chessboard__cell--dark': (symIndex + digitindex) % 2 !== 0,
                  })}
                >
                  {Icon && cellItem && (
                    <button
                      className="chessboard__button"
                      type="button"
                      onClick={onPieceClick(id, cellItem.color, cellItem.type)}
                    >
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
