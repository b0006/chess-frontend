import { useCallback, useEffect, useRef } from 'react';
import * as ChessJS from 'chess.js';

import { GameData } from '../../../mobx/gameStore';

import { PromotionPieceType } from './types';

type MoveData = {
  [key in string]: ChessJS.Move;
};

interface UseAiParty {
  game: Partial<GameData>;
  stateChess: ChessJS.ChessInstance;
  withAnimation: boolean;
  animationMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
  staticMove: (from: ChessJS.Square, to: ChessJS.Square, promotion?: PromotionPieceType) => void;
}

const useAiParty = ({ game, stateChess, withAnimation, animationMove, staticMove }: UseAiParty): any => {
  const chessRef = useRef(stateChess);
  const engineRef = useRef<any>();

  const isMyTurn = stateChess.turn() === game.myColor;

  const startEnemyMove = useCallback(() => {
    if (engineRef.current && chessRef.current && chessRef.current.turn() !== game.myColor) {
      engineRef.current.postMessage(`position fen ${chessRef.current.fen()}`);
      engineRef.current.postMessage(`go depth ${game.difficult}`);
    }
  }, [game.difficult, game.myColor]);

  useEffect(() => {
    if (game.versusAi && isMyTurn === false) {
      startEnemyMove();
    }
  }, [isMyTurn, game.versusAi, startEnemyMove]);

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
  }, [game.difficult, game.myColor, game.versusAi, onEngineEvent, stateChess]);
};

export { useAiParty };
