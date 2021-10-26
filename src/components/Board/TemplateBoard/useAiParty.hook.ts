import { useCallback, useEffect, useRef, useState } from 'react';

import { MoveData, UseAiParty, ChessEngine, PromotionPieceType } from './types';

const useAiParty = ({
  myColor,
  isVersusAi,
  stateChess,
  withAnimation,
  animationMove,
  staticMove,
  difficult = 5,
}: UseAiParty): { isAiMoving: boolean } => {
  const chessRef = useRef(stateChess);
  const engineRef = useRef<ChessEngine>();

  const [wasLoad, setWasLoad] = useState(false);
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
    if (isVersusAi && isMyTurn === false) {
      startEnemyMove();
    }
  }, [isMyTurn, isVersusAi, startEnemyMove]);

  const enemyMove = useCallback(
    (bestMoveLine: string) => {
      const bestMove = bestMoveLine.substring(0, 4);
      const promotion = bestMoveLine.length === 5 && (bestMoveLine.substring(4, 5) as PromotionPieceType);

      const moves = stateChess.moves({ verbose: true });

      const movesData: MoveData = moves.reduce(
        (result, acc) => ({
          ...result,
          [`${acc.from}${acc.to}`]: acc,
        }),
        {}
      );

      if (movesData[bestMove]) {
        withAnimation
          ? animationMove(movesData[bestMove].from, movesData[bestMove].to, promotion || movesData[bestMove].promotion)
          : staticMove(movesData[bestMove].from, movesData[bestMove].to, promotion || movesData[bestMove].promotion);

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
    if (!isVersusAi || wasLoad) {
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

      setWasLoad(true);
    };

    loadEngine();
  }, [difficult, myColor, isVersusAi, onEngineEvent, stateChess, wasLoad]);

  return { isAiMoving };
};

export { useAiParty };
