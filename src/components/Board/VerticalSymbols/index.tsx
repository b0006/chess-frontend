import React from 'react';

import { VERTICAL_SYMBOLS_REVERSE } from '../constants';

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

export { VerticalSymbols };
