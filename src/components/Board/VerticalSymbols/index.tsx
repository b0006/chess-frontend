import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { boardStore } from '../../../mobx';
import { VERTICAL_SYMBOLS_REVERSE } from '../constants';

const VerticalSymbols: React.FC = observer(() => {
  return (
    <div className="chessboard__vertical-panel">
      {VERTICAL_SYMBOLS_REVERSE.map((sym) => (
        <div
          className={cn('chessboard__digit-symbol', {
            'chessboard__digit-symbol--rotate': boardStore.board.isRotate,
          })}
          key={sym}
        >
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
});

export { VerticalSymbols };
