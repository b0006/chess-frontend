import React from 'react';
import { io, Socket } from 'socket.io-client';

import { Button } from '../../components/Common/Button';
import { MainMenu } from '../../components/Start/MainMenu';

const StartPage: React.FC = () => {
  const wsRef = React.useRef<Socket<any, any>>();

  React.useEffect(() => {
    const onConnect = () => {
      wsRef.current = io('http://localhost:81', {
        withCredentials: true,
        transports: ['websocket'],
      });
      // wsRef.current.on('msgToClient', (message: any) => {
      //   console.log('msgToClient', message);
      // });

      wsRef.current.on('userTest', (message: any) => {
        console.log('userTest', message);
      });
    };

    onConnect();
  }, []);

  const onClick = () => {
    // wsRef.current?.emit('msgToServer', 'teeeeee');
    wsRef.current?.emit('userTest', JSON.stringify({ type: 'test', message: 'content' }));
  };

  return (
    <div>
      <MainMenu />
      <Button onClick={onClick} text="Send" />
    </div>
  );
};

export { StartPage };
