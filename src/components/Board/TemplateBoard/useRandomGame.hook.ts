import { useEffect, useRef } from 'react';

import { UseRandom } from './types';

const MOVE_TIMEOUT = 800;

const useRandomGame = ({ isRandom, stateChess, withAnimation, animationMove, staticMove }: UseRandom): void => {
  const chess = useRef(stateChess);

  useEffect(() => {
    if (isRandom) {
      let intervalId: NodeJS.Timeout | null = null;

      const setRandomMove = () => {
        intervalId = setInterval(() => {
          const moves = chess.current.moves({ verbose: true });
          const randomMove = moves[Math.floor(Math.random() * moves.length)];
          if (!randomMove) {
            return;
          }

          withAnimation
            ? animationMove(randomMove.from, randomMove.to, randomMove.promotion)
            : staticMove(randomMove.from, randomMove.to, randomMove.promotion);

          if (chess.current.game_over() && intervalId) {
            clearInterval(intervalId);
            chess.current.reset();
            setRandomMove();
          }
        }, MOVE_TIMEOUT);
      };

      setRandomMove();

      const chessCleanUp = chess.current;

      return () => {
        chessCleanUp.clear();
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [animationMove, isRandom, staticMove, withAnimation]);
};

export { useRandomGame };
