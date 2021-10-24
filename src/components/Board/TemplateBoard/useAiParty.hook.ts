import { useEffect, useRef } from 'react';
import * as ChessJS from 'chess.js';

import { GameData } from '../../../mobx/gameStore';

interface UseAiParty {
  game: Partial<GameData>;
  stateChess: ChessJS.ChessInstance;
}

const useAiParty = ({ game, stateChess }: UseAiParty): any => {
  // const { difficult, myColor, versusAi } = game;

  const chessRef = useRef(stateChess);
  const engineRef = useRef<any>();

  const onEngineEvent = (event: any) => {
    window.console.log('STOCKFISH event', event);
  };

  useEffect(() => {
    if (!game.versusAi) {
      return;
    }

    const loadEngine = () => {
      if (typeof window.STOCKFISH === 'undefined' || !stateChess) {
        window.console.error("Engine was'nt loaded");
        return;
      }

      chessRef.current = stateChess;

      const engine = window.STOCKFISH();
      engineRef.current = engine;
      engine.onmessage = onEngineEvent;

      engine.postMessage('ucinewgame');
      engine.postMessage(`position fen ${stateChess.fen()}`);

      // the first enemy move
      if (game.myColor === 'b') {
        engine.postMessage(`go depth ${game.difficult}`);
      }
    };

    loadEngine();
  }, [game.difficult, game.myColor, game.versusAi, stateChess]);

  const onMoveEnd = () => {
    if (engineRef.current && chessRef.current && chessRef.current.turn() !== game.myColor) {
      engineRef.current.postMessage(`position fen ${chessRef.current.fen()}`);
      engineRef.current.postMessage(`go depth ${game.difficult}`);
    }
  };

  return { onMoveEnd };
};

export { useAiParty };
