import React from 'react';

import { Button } from '../../components/Common/Button';
import { MainMenu } from '../../components/Start/MainMenu';
import { useWebsocket } from '../../hook/useWebsocket.hook';

const StartPage: React.FC = () => {
  const { ws } = useWebsocket();

  const onClick = () => {
    ws?.emit('userTest', JSON.stringify({ type: 'test', message: 'content' }));
  };

  return (
    <div>
      <MainMenu />
      <Button onClick={onClick} text="Send" />
    </div>
  );
};

export { StartPage };
