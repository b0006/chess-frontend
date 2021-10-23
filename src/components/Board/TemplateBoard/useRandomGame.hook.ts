import { useEffect } from 'react';

import { UseRandom } from './types';

const useRandomGame = ({ isRandom, stateChess, withAnimation, animationMove, staticMove }: UseRandom): void => {
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
