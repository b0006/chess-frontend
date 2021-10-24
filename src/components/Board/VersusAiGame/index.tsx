import React, { useEffect, useState } from 'react';
import * as ChessJS from 'chess.js';
import { observer } from 'mobx-react-lite';

import { TemplateBoard } from '../TemplateBoard';
import { gameStore } from '../../../mobx';

const VersusAiGame: React.FC = observer(() => {
  const { game } = gameStore;

  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance>();

  useEffect(() => {
    const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;
    const chess = new Chess();
    setStateChess(chess);
  }, []);

  return <div>{stateChess && <TemplateBoard game={game} stateChess={stateChess} myColor={game.myColor} />}</div>;
});

export { VersusAiGame };
