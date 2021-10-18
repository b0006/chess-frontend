import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { boardStore } from '../../../mobx';
import { HORIZONTAL_SYMBOLS } from '../constants';

const HorizontalSymbols: React.FC = observer(() => {
  return (
    <div className="chessboard__horizontal-panel">
      {HORIZONTAL_SYMBOLS.map((sym) => (
        <div
          className={cn('chessboard__alphabet-symbol', {
            'chessboard__alphabet-symbol--rotate': boardStore.board.isRotate,
          })}
          key={sym}
        >
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
});

export { HorizontalSymbols };
