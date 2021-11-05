import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useObserver } from 'mobx-react';

import { userStore } from '../mobx';

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

type WS = Socket<DefaultEventsMap, DefaultEventsMap>;

interface Message {
  type: string;
  data?: Record<string, unknown> | string;
}

const WS_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const useWebsocket = (
  url = WS_URL,
  transport = 'websocket'
): {
  sendWsMsg: (event: string, message: Message) => void;
  listenWsMsg: (event: string, callback: (message: Message) => void) => void;
} => {
  const token = useObserver(() => userStore.token);
  const wsRef = useRef<WS>();

  useEffect(() => {
    if (token) {
      wsRef.current = io(url, {
        withCredentials: true,
        transports: [transport],
        auth: {
          token,
        },
      });
    }

    return () => {
      wsRef.current?.close();
    };
  }, [transport, url, token]);

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
