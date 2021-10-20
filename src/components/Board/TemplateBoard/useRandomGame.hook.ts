import { useEffect } from 'react';
import * as ChessJS from 'chess.js';

import { PromotionPieceType } from '.';

interface IProps {
  stateChess: ChessJS.ChessInstance;
  withAnimation: boolean;
  isRandom: boolean;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
}

const useRandomGame = ({ isRandom, stateChess, withAnimation, animationMove, staticMove }: IProps): void => {
  useEffect(() => {
    if (isRandom) {
      let intervalId: NodeJS.Timeout | null = null;

      const setRandomMove = () => {
        intervalId = setInterval(() => {
          const moves = stateChess.moves({ verbose: true });
          const randomMove = moves[Math.floor(Math.random() * moves.length)];
          withAnimation
            ? animationMove(randomMove.from, randomMove.to, randomMove.promotion)
            : staticMove(randomMove.from, randomMove.to, randomMove.promotion);

          if (stateChess.game_over() && intervalId) {
            clearInterval(intervalId);
            stateChess.reset();
            setRandomMove();
          }
        }, 500);
      };

      setRandomMove();

      return () => {
        stateChess.clear();
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [animationMove, isRandom, stateChess, staticMove, withAnimation]);
};

export { useRandomGame };
