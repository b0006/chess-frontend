import React, { useState } from 'react';
import * as ChessJS from 'chess.js';

import { Wrapper as Chessboard } from '../../components/Board/Wrapper';
import { IGameOver } from '../../components/Board/Wrapper/types';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const BoardPage: React.FC = () => {
  const [isRotate, setIsRotate] = useState(false);
  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance | null>(null);

  const onClickNewGame = () => {
    const chess = new Chess();
    setStateChess(chess);
  };

  const isGameOver = (): IGameOver => ({
    color: stateChess?.turn(),
    isGameOver: stateChess?.game_over(),
    inCheck: stateChess?.in_check(),
    inCheckmate: stateChess?.in_checkmate(),
    inDraw: stateChess?.in_draw(),
    inStalemate: stateChess?.in_stalemate(),
    inThreefoldRepetition: stateChess?.in_threefold_repetition(),
    insufficientMaterial: stateChess?.insufficient_material(),
  });

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
          isGameOver={isGameOver}
        />
      )}
      <button onClick={onClickNewGame}>Start a new game</button>
      <button onClick={() => setIsRotate(!isRotate)}>Rotate board [{String(isRotate)}]</button>
    </div>
  );
};

export { BoardPage };
