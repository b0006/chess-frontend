import React, { useEffect, useState } from 'react';
import * as ChessJS from 'chess.js';
import { observer } from 'mobx-react-lite';

import { TemplateBoard } from '../TemplateBoard';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const VersusAiGame: React.FC = observer(() => {
  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance>();

  useEffect(() => {
    const chess = new Chess();
    setStateChess(chess);

    // const loadEngine = () => {
    //   const stock = window.STOCKFISH();

    //   stock.onmessage = function (event: any) {
    //     console.log('event', event);
    //   };
    // };

    // window.addEventListener('DOMContentLoaded', loadEngine);

    // return () => {
    //   window.removeEventListener('DOMContentLoaded', loadEngine);
    // };
  }, []);

  return (
    <div>
      <div>
        VersusAiGame
        {stateChess && <TemplateBoard stateChess={stateChess} myColor="w" />}
      </div>
    </div>
  );
});

export { VersusAiGame };
