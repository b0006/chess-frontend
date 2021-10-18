import React from 'react';
import cn from 'classnames';

import './styles.scss';

const VERTICAL_SYMBOLS = ['1', '2', '3', '4', '5', '6', '7', '8'];
const VERTICAL_SYMBOLS_REVERSE = VERTICAL_SYMBOLS.reverse();
const HORIZONTAL_SYMBOLS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const HorizontalSymbols: React.FC = () => {
  return (
    <div className="chessboard__horizontal-panel">
      {HORIZONTAL_SYMBOLS.map((sym) => (
        <div className="chessboard__alphabet-symbol" key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

const VerticalSymbols: React.FC = () => {
  return (
    <div className="chessboard__vertical-panel">
      {VERTICAL_SYMBOLS_REVERSE.map((sym) => (
        <div className="chessboard__digit-symbol" key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

const Board: React.FC = () => {
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
                    'chessboard__cell--light': false,
                    'chessboard__cell--dark': false,
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
};

const Chessboard: React.FC = () => {
  return (
    <div className="chessboard">
      <div className="chessboard__inner">
        <HorizontalSymbols />
        <div className="chessboard__game">
          <VerticalSymbols />
          <Board />
          <VerticalSymbols />
        </div>
        <HorizontalSymbols />
      </div>
    </div>
  );
};

export { Chessboard };
