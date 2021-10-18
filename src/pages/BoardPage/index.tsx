import React, { useState } from 'react';
import * as ChessJS from 'chess.js';

import { Chessboard } from '../../components/Board/Chessboard';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const BoardPage: React.FC = () => {
  const [isRotate, setIsRotate] = useState(false);
  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance | null>(null);

  const onClickNewGame = () => {
    const chess = new Chess();
    setStateChess(chess);
  };

  // const onClickContinue = () => {
  //   const chess = new Chess('r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19');
  //   const stateBoard = chess.board();
  //   setBoard(stateBoard);
  //   setStateChess(chess);
  // };

  return (
    <div>
      {stateChess && (
        <Chessboard
          isRotate={isRotate}
          initBoard={stateChess.board()}
          getLegalMoves={stateChess.moves}
          getTurn={stateChess.turn}
          setMove={stateChess.move}
          getBoardState={stateChess.board}
        />
      )}
      <button onClick={onClickNewGame}>Start a new game</button>
      {/* <button onClick={onClickContinue}>Continue a game</button> */}
      <button onClick={() => setIsRotate(!isRotate)}>Rotate board [{String(isRotate)}]</button>
    </div>
  );
};

export { BoardPage };
