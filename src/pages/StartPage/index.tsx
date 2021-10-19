import React from 'react';

import { Container } from '../../components/Layout/Container';
import { StartMenu } from '../../components/Start/StartMenu';

const StartPage: React.FC = () => {
  return (
    <Container>
      <StartMenu />
    </Container>
  );
};

export { StartPage };
