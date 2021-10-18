import React from 'react';

import { VerticalSymbols } from '../VerticalSymbols';
import { GameBoard } from '../GameBoard';
import { HorizontalSymbols } from '../HorizontalSymbols';

import './styles.scss';

const Chessboard: React.FC = () => {
  return (
    <div className="chessboard">
      <div className="chessboard__inner">
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
};

export { Chessboard };
