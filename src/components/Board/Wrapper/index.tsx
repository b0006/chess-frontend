import React, { useState, useEffect } from 'react';
import * as ChessJS from 'chess.js';
import cn from 'classnames';

import { Popup } from '../../Common/Popup';
import { VerticalSymbols } from '../VerticalSymbols';
import { GameBoard } from '../GameBoard';
import { HorizontalSymbols } from '../HorizontalSymbols';

import { TMoves, TChessBoard, TChessColor, IGameOver } from './types';
import './styles.scss';

interface IProps {
  isRotate: boolean;
  initBoard: TChessBoard;
  getLegalMoves: TMoves;
  getTurn: () => TChessColor;
  setMove: (move: string | ChessJS.ShortMove, options?: { sloppy?: boolean }) => ChessJS.Move | null;
  getBoardState: () => TChessBoard;
  isGameOver: () => IGameOver;
}

const Wrapper: React.FC<IProps> = ({
  isRotate,
  initBoard,
  getLegalMoves,
  getTurn,
  setMove,
  getBoardState,
  isGameOver,
}) => {
  const [isVisibleEnd, setIsVisibleEnd] = useState(false);
  const [board, setBoard] = useState<TChessBoard>(initBoard);

  const onMove = (data: ChessJS.ShortMove) => {
    setMove(data);
    setBoard(getBoardState());

    const result = isGameOver();
    if (result.isGameOver) {
      setIsVisibleEnd(true);
    }
  };

  useEffect(() => {
    setBoard(initBoard);
  }, [initBoard]);

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
      <Popup
        title="Game over"
        confirm={{ label: 'curva', handler: () => setIsVisibleEnd(false) }}
        description="Stupid"
        isVisible={isVisibleEnd}
        onClose={() => setIsVisibleEnd(false)}
      />
    </div>
  );
};

export { Wrapper };
