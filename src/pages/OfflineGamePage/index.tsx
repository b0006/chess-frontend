import React from 'react';
import { observer } from 'mobx-react-lite';
import { Redirect } from 'react-router-dom';

import { gameStore } from '../../mobx';
import { VersusAiGame } from '../../components/Board/VersusAiGame';

const OfflineGamePage: React.FC = observer(() => {
  const { game } = gameStore;

  if (!game.versusAi && !game.isPlaying) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <VersusAiGame />
    </div>
  );
});

export { OfflineGamePage };
