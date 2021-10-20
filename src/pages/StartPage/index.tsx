import React from 'react';

import { NewBoard } from '../../components/Board/NewBoard';
import { Container } from '../../components/Layout/Container';
// import { StartMenu } from '../../components/Start/StartMenu';

const StartPage: React.FC = () => {
  return (
    <Container>
      <NewBoard />
      {/* <StartMenu /> */}
    </Container>
  );
};

export { StartPage };
