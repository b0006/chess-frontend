import React from 'react';
import cn from 'classnames';

import { HORIZONTAL_SYMBOLS } from '../constants';

interface IProps {
  isRotate: boolean;
}

const HorizontalSymbols: React.FC<IProps> = ({ isRotate }) => {
  return (
    <div className="chessboard__horizontal-panel">
      {HORIZONTAL_SYMBOLS.map((sym) => (
        <div
          className={cn('chessboard__alphabet-symbol', {
            'chessboard__alphabet-symbol--rotate': isRotate,
          })}
          key={sym}
        >
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export { HorizontalSymbols };
