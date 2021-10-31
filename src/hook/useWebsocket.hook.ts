// import { DefaultEventsMap, Emitter } from '@socket.io/component-emitter';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

type WS = Socket<DefaultEventsMap, DefaultEventsMap>;

const useWebsocket = (url = 'http://localhost:81', transport = 'websocket'): { ws?: WS } => {
  const wsRef = useRef<WS>();

  useEffect(() => {
    wsRef.current = io(url, {
      withCredentials: true,
      transports: [transport],
    });

    // wsRef.current.on('msgToClient', (message: any) => {
    //   console.log('msgToClient', message);
    // });

    // wsRef.current.on('userTest', (message: any) => {
    //   console.log('userTest', message);
    // });
  }, [transport, url]);

  return { ws: wsRef.current };
};

export { useWebsocket };
