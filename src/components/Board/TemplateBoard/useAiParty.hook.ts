import { useCallback, useEffect, useRef, useState } from 'react';
import * as ChessJS from 'chess.js';

import { ChessColor, PromotionPieceType } from './types';

type MoveData = {
  [key in string]: ChessJS.Move;
};

interface UseAiParty {
  myColor: ChessColor;
  versusAi: boolean;
  difficult: number | null;
  stateChess: ChessJS.ChessInstance;
  withAnimation: boolean;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
}

const useAiParty = ({
  myColor,
  versusAi,
  stateChess,
  withAnimation,
  animationMove,
  staticMove,
  difficult = 5,
}: UseAiParty): { isAiMoving: boolean } => {
  const chessRef = useRef(stateChess);
  const engineRef = useRef<any>();

  const [isAiMoving, setIsAiMoving] = useState(false);

  const isMyTurn = stateChess.turn() === myColor;

  const startEnemyMove = useCallback(() => {
    if (engineRef.current && chessRef.current && chessRef.current.turn() !== myColor) {
      setIsAiMoving(true);

      engineRef.current.postMessage(`position fen ${chessRef.current.fen()}`);
      engineRef.current.postMessage(`go depth ${difficult}`);
    }
  }, [difficult, myColor]);

  useEffect(() => {
    if (versusAi && isMyTurn === false) {
      startEnemyMove();
    }
  }, [isMyTurn, versusAi, startEnemyMove]);

  const enemyMove = useCallback(
    (value: string) => {
      const moves = stateChess.moves({ verbose: true });

      const movesData = moves.reduce(
        (result, acc) => ({
          ...result,
          [`${acc.from}${acc.to}`]: acc,
        }),
        {} as MoveData
      );

      if (movesData[value]) {
        withAnimation
          ? animationMove(movesData[value].from, movesData[value].to, movesData[value].promotion)
          : staticMove(movesData[value].from, movesData[value].to, movesData[value].promotion);

        setIsAiMoving(false);
      }
    },
    [animationMove, stateChess, staticMove, withAnimation]
  );

  const onEngineEvent = useCallback(
    (event: unknown) => {
      window.console.log('STOCKFISH event', event);

      if (typeof event === 'string') {
        const [name, value]: string[] = event.split(' ');
        if (name === 'bestmove' && value) {
          enemyMove(value);
        }
      }
    },
    [enemyMove]
  );

  useEffect(() => {
    if (!versusAi) {
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
      if (myColor === 'b') {
        engine.postMessage(`go depth ${difficult}`);
      }
    };

    loadEngine();
  }, [difficult, myColor, versusAi, onEngineEvent, stateChess]);

  return { isAiMoving };
};

export { useAiParty };
