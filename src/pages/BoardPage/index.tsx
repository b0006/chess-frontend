import React from 'react';
import { observer } from 'mobx-react-lite';

import { boardStore } from '../../mobx';
import { Chessboard } from '../../components/Board/Chessboard';

const BoardPage: React.FC = observer(() => {
  return (
    <div>
      <Chessboard />
      <button onClick={() => boardStore.rotate()}>Rotate board [{String(boardStore.board.isRotate)}]</button>
    </div>
  );
});

export { BoardPage };
