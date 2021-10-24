import React, { useEffect, useRef, useState } from 'react';
import * as ChessJS from 'chess.js';
import { observer } from 'mobx-react-lite';

import { TemplateBoard } from '../TemplateBoard';
import { gameStore } from '../../../mobx';

const VersusAiGame: React.FC = observer(() => {
  const {
    game: { difficult, myColor, isColoredMoves },
  } = gameStore;

  const chessRef = useRef<ChessJS.ChessInstance>();
  const engineRef = useRef<any>();

  const [isLoaded, setIsLoaded] = useState(false);

  const onEngineEvent = (event: any) => {
    window.console.log('STOCKFISH event', event);
  };

  useEffect(() => {
    const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

    const chess = new Chess();
    chessRef.current = chess;

    const loadEngine = () => {
      if (typeof window.STOCKFISH === 'undefined') {
        window.console.error("Stockfish was'nt loaded");
        return;
      }

      const engine = window.STOCKFISH();
      engineRef.current = engine;
      engine.onmessage = onEngineEvent;

      engine.postMessage('ucinewgame');
      engine.postMessage(`position fen ${chess.fen()}`);

      // the first enemy move
      if (myColor === 'b') {
        engine.postMessage(`go depth ${difficult}`);
      }

      setIsLoaded(true);
    };

    loadEngine();
  }, [difficult, myColor]);

  const onMoveEnd = () => {
    if (engineRef.current && chessRef.current && chessRef.current.turn() !== myColor) {
      engineRef.current.postMessage(`position fen ${chessRef.current.fen()}`);
      engineRef.current.postMessage(`go depth ${difficult}`);
    }
  };

  return (
    <div>
      <div>
        VersusAiGame
        {chessRef.current && isLoaded && (
          <TemplateBoard
            onMoveEnd={onMoveEnd}
            stateChess={chessRef.current}
            myColor={myColor}
            isColoredMoves={isColoredMoves}
          />
        )}
      </div>
    </div>
  );
});

export { VersusAiGame };
