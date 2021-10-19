import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as ChessJS from 'chess.js';

import { HorizontalSymbols } from '../HorizontalSymbols';
import { VerticalSymbols } from '../VerticalSymbols';
import { TemplateBoard } from '../TemplateBoard';
import { TChessBoard } from '../Wrapper/types';
import { sleep } from '../../../utils/time';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const RandomBoard: React.FC = () => {
  const [boardState, setBoardState] = useState<TChessBoard>([]);
  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance | null>(null);

  useEffect(() => {
    const chess = new Chess();
    setStateChess(chess);
    setBoardState(chess.board());
  }, []);

  useEffect(() => {
    if (stateChess) {
      const setRandomMove = async () => {
        const moves = stateChess.moves();
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        stateChess.move(randomMove);
        setBoardState(stateChess.board());
        await sleep(1000);

        if (!stateChess.game_over()) {
          setRandomMove();
        } else {
          setTimeout(() => {
            stateChess.reset();
            setRandomMove();
          }, 2000);
        }
      };

      setTimeout(() => {
        setRandomMove();
      }, 2000);
    }
  }, [stateChess]);

  if (!stateChess) {
    return null;
  }

  return (
    <div className={cn('chessboard', 'chessboard--overlay')}>
      <div className="chessboard__inner">
        <HorizontalSymbols />
        <div className="chessboard__game">
          <VerticalSymbols />
          <TemplateBoard board={boardState} isRotate={false} isNoEvents />
          <VerticalSymbols />
        </div>
        <HorizontalSymbols />
      </div>
    </div>
  );
};

export { RandomBoard };
