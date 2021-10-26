import React from 'react';

import { Container } from '../../components/Layout/Container';
import { LobbyMenu } from '../../components/Lobby/LobbyMenu';

const OnlineLobbyPage: React.FC = () => {
  return (
    <Container>
      <LobbyMenu />
    </Container>
  );
};

export { OnlineLobbyPage };
