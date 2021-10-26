import React from 'react';

import { Button } from '../../components/Common/Button';
import { Container } from '../../components/Layout/Container';

const OnlineLobbyPage: React.FC = () => {
  return (
    <Container>
      <div>
        <Button text="Создать партию" />
      </div>
      <div>Список партий</div>
    </Container>
  );
};

export { OnlineLobbyPage };
