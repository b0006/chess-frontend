import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as ChessJS from 'chess.js';

import { HorizontalSymbols } from '../HorizontalSymbols';
import { VerticalSymbols } from '../VerticalSymbols';
import { TemplateBoard } from '../TemplateBoard';
import { TChessBoard } from '../Wrapper/types';

import styles from './RandomBoard.module.scss';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const RandomBoard: React.FC = () => {
  const [boardState, setBoardState] = useState<TChessBoard>([]);
  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance | null>(null);

  useEffect(() => {
    const chess = new Chess();
    setStateChess(chess);
    setBoardState(chess.board());

    let intervalId: NodeJS.Timeout | null = null;

    const setRandomMove = () => {
      intervalId = setInterval(() => {
        const moves = chess.moves();
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        chess.move(randomMove);
        setBoardState(chess.board());

        if (chess.game_over() && intervalId) {
          clearInterval(intervalId);
          chess.reset();
          setRandomMove();
        }
      }, 1000);
    };

    setRandomMove();

    return () => {
      chess.clear();
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  if (!stateChess) {
    return null;
  }

  return (
    <div className={cn(styles.chessboard, styles['chessboard--overlay'])}>
      <div className={styles.inner}>
        <HorizontalSymbols />
        <div className={styles.game}>
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
