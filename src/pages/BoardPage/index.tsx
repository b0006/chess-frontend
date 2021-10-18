import React, { useState } from 'react';
import * as ChessJS from 'chess.js';

import { Chessboard } from '../../components/Board/Chessboard';
import { TChessBoard } from '../../components/Board/Chessboard/types';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const BoardPage: React.FC = () => {
  const [isRotate, setIsRotate] = useState(false);
  const [board, setBoard] = useState<TChessBoard>([]);

  const onClickNewGame = () => {
    const chess = new Chess();
    const stateBoard = chess.board();
    setBoard(stateBoard);
  };

  const onClickContinue = () => {
    const chess = new Chess('r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19');
    const stateBoard = chess.board();
    setBoard(stateBoard);
  };

  return (
    <div>
      <Chessboard isRotate={isRotate} board={board} />
      <button onClick={onClickNewGame}>Start a new game</button>
      <button onClick={onClickContinue}>Continue a game</button>
      <button onClick={() => setIsRotate(!isRotate)}>Rotate board [{String(isRotate)}]</button>
    </div>
  );
};

export { BoardPage };
