import React from 'react';

import { HORIZONTAL_SYMBOLS } from '../constants';

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

export { HorizontalSymbols };
