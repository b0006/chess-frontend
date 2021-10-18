import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { boardStore } from '../../../mobx';
import { HORIZONTAL_SYMBOLS, VERTICAL_SYMBOLS_REVERSE } from '../constants';

const GameBoard: React.FC = observer(() => {
  return (
    <div className="chessboard__board">
      {HORIZONTAL_SYMBOLS.map((sym, symIndex) => {
        return (
          <div key={sym} className="chessboard__row">
            {VERTICAL_SYMBOLS_REVERSE.map((_, digitindex) => {
              const id = `${HORIZONTAL_SYMBOLS[digitindex]}${VERTICAL_SYMBOLS_REVERSE[symIndex]}`;
              return (
                <div
                  key={id}
                  id={id}
                  className={cn('chessboard__cell', {
                    'chessboard__cell--rotate': boardStore.board.isRotate,
                    'chessboard__cell--light': (symIndex + digitindex) % 2 === 0,
                    'chessboard__cell--dark': (symIndex + digitindex) % 2 !== 0,
                  })}
                >
                  {id}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

export { GameBoard };
