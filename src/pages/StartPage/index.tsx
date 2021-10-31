import React, { useEffect } from 'react';

import { Button } from '../../components/Common/Button';
import { MainMenu } from '../../components/Start/MainMenu';
import { useWebsocket } from '../../hook/useWebsocket.hook';

const StartPage: React.FC = () => {
  const { sendWsMsg, listenWsMsg } = useWebsocket();

  const onClick = () => {
    sendWsMsg('userTest', { type: 'test', data: 'content' });
  };

  useEffect(() => {
    listenWsMsg('userTest', (message) => {
      console.log(message);
    });
  }, [listenWsMsg]);

  return (
    <div>
      <MainMenu />
      <Button onClick={onClick} text="Send" />
    </div>
  );
};

export { StartPage };
