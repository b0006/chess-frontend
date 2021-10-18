import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { boardStore } from '../../../mobx';
import { VerticalSymbols } from '../VerticalSymbols';
import { GameBoard } from '../GameBoard';
import { HorizontalSymbols } from '../HorizontalSymbols';

import './styles.scss';

const Chessboard: React.FC = observer(() => {
  return (
    <div className="chessboard">
      <div className={cn('chessboard__inner', { 'chessboard__inner--rotate': boardStore.board.isRotate })}>
        <HorizontalSymbols />
        <div className="chessboard__game">
          <VerticalSymbols />
          <GameBoard />
          <VerticalSymbols />
        </div>
        <HorizontalSymbols />
      </div>
    </div>
  );
});

export { Chessboard };
