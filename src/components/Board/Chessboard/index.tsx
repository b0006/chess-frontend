import React from 'react';
import cn from 'classnames';

import { VerticalSymbols } from '../VerticalSymbols';
import { GameBoard } from '../GameBoard';
import { HorizontalSymbols } from '../HorizontalSymbols';

import { TChessBoard } from './types';
import './styles.scss';

interface IProps {
  isRotate: boolean;
  board: TChessBoard;
}

const Chessboard: React.FC<IProps> = ({ isRotate, board }) => {
  return (
    <div className="chessboard">
      <div className={cn('chessboard__inner', { 'chessboard__inner--rotate': isRotate })}>
        <HorizontalSymbols isRotate={isRotate} />
        <div className="chessboard__game">
          <VerticalSymbols isRotate={isRotate} />
          <GameBoard isRotate={isRotate} board={board} />
          <VerticalSymbols isRotate={isRotate} />
        </div>
        <HorizontalSymbols isRotate={isRotate} />
      </div>
    </div>
  );
};

export { Chessboard };
