import React, { useState } from 'react';
import cn from 'classnames';

import { VerticalSymbols } from '../VerticalSymbols';
import { GameBoard } from '../GameBoard';
import { HorizontalSymbols } from '../HorizontalSymbols';

import { TMoves, TChessBoard, TChessColor } from './types';
import './styles.scss';

interface IProps {
  isRotate: boolean;
  initBoard: TChessBoard;
  getLegalMoves: TMoves;
  getTurn: () => TChessColor;
  setMove: any;
  getBoardState: () => any;
}

const Chessboard: React.FC<IProps> = ({ isRotate, initBoard, getLegalMoves, getTurn, setMove, getBoardState }) => {
  const [board, setBoard] = useState<TChessBoard>(initBoard);

  const onMove = (data: any) => {
    setMove(data);
    setBoard(getBoardState());
  };

  return (
    <div className="chessboard">
      <div className={cn('chessboard__inner', { 'chessboard__inner--rotate': isRotate })}>
        <HorizontalSymbols isRotate={isRotate} />
        <div className="chessboard__game">
          <VerticalSymbols isRotate={isRotate} />
          <GameBoard
            isRotate={isRotate}
            board={board}
            getLegalMoves={getLegalMoves}
            getTurn={getTurn}
            setMove={onMove}
          />
          <VerticalSymbols isRotate={isRotate} />
        </div>
        <HorizontalSymbols isRotate={isRotate} />
      </div>
    </div>
  );
};

export { Chessboard };
