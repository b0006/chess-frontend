import React, { useEffect, useState } from 'react';
import * as ChessJS from 'chess.js';
import { observer } from 'mobx-react-lite';

import { TemplateBoard } from '../TemplateBoard';
import { gameStore } from '../../../mobx';

import styles from './VersusAiGame.module.scss';

const VersusAiGame: React.FC = observer(() => {
  const { game } = gameStore;

  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance>();

  useEffect(() => {
    const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;
    const chess = new Chess();
    setStateChess(chess);
  }, []);

  return (
    <div className={styles.wrapper}>
      {stateChess && (
        <TemplateBoard
          difficult={game.difficult}
          stateChess={stateChess}
          isColoredMoves={game.isColoredMoves}
          versusAi={game.versusAi}
          myColor={game.myColor}
        />
      )}
    </div>
  );
});

export { VersusAiGame };
