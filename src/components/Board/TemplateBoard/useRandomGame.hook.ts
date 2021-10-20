import { useEffect } from 'react';
import * as ChessJS from 'chess.js';

interface IProps {
  stateChess: ChessJS.ChessInstance;
  withAnimation: boolean;
  isRandom: boolean;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, isPromotion?: boolean) => void;
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, isPromotion?: boolean) => void;
}

const useRandomGame = ({ isRandom, stateChess, withAnimation, animationMove, staticMove }: IProps) => {
  useEffect(() => {
    if (isRandom) {
      let intervalId: NodeJS.Timeout | null = null;

      const setRandomMove = () => {
        intervalId = setInterval(() => {
          const moves = stateChess.moves({ verbose: true });
          const randomMove = moves[Math.floor(Math.random() * moves.length)];
          withAnimation ? animationMove(randomMove.from, randomMove.to) : staticMove(randomMove.from, randomMove.to);

          if (stateChess.game_over() && intervalId) {
            clearInterval(intervalId);
            stateChess.reset();
            setRandomMove();
          }
        }, 1000);
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
