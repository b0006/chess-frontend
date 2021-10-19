import React from 'react';
import cn from 'classnames';

import { VERTICAL_SYMBOLS_REVERSE } from '../constants';

interface IProps {
  isRotate?: boolean;
}

const VerticalSymbols: React.FC<IProps> = ({ isRotate }) => {
  return (
    <div className="chessboard__vertical-panel">
      {VERTICAL_SYMBOLS_REVERSE.map((sym) => (
        <div
          className={cn('chessboard__digit-symbol', {
            'chessboard__digit-symbol--rotate': isRotate,
          })}
          key={sym}
        >
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export { VerticalSymbols };
