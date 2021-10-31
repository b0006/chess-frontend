import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

type WS = Socket<DefaultEventsMap, DefaultEventsMap>;

interface Message {
  type: string;
  data?: Record<string, unknown> | string;
}

const useWebsocket = (
  url = 'http://localhost:4000',
  transport = 'websocket'
): {
  sendWsMsg: (event: string, message: Message) => void;
  listenWsMsg: (event: string, callback: (message: Message) => void) => void;
} => {
  const wsRef = useRef<WS>();

  useEffect(() => {
    wsRef.current = io(url, {
      withCredentials: true,
      transports: [transport],
    });

    return () => {
      wsRef.current?.close();
    };
  }, [transport, url]);

  const sendWsMsg = (event: string, message: Message) => {
    wsRef.current?.emit(event, JSON.stringify(message));
  };

  const listenWsMsg = useCallback((event: string, callback: (message: Message) => void) => {
    wsRef.current?.on(event, (message: Message) => {
      callback(message);
    });
  }, []);

  return { sendWsMsg, listenWsMsg };
};

export { useWebsocket };
