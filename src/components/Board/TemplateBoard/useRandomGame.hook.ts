import { useEffect, useRef } from 'react';

import { UseRandom } from './types';

const MOVE_TIMEOUT = 800;

let t = 0;

const useRandomGame = ({ isRandom, stateChess, withAnimation, animationMove, staticMove }: UseRandom): void => {
  const chess = useRef(stateChess);

  useEffect(() => {
    if (isRandom && t === 0) {
      t = 1;
      let intervalId: NodeJS.Timeout | null = null;
      console.log('init', chess.current.moves({ verbose: true }));

      const setRandomMove = () => {
        console.log('setRandomMove', chess.current.moves({ verbose: true }));
        intervalId = setInterval(() => {
          console.log('TIME', chess.current.moves({ verbose: true }));
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
