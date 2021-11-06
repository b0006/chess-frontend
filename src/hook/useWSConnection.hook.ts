import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useObserver } from 'mobx-react';

import { userStore, wsStore } from '../mobx';

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

type WS = Socket<DefaultEventsMap, DefaultEventsMap>;

const WS_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const useWSConnection = (url = WS_URL, transport = 'websocket'): void => {
  const initConnection = useObserver(() => wsStore.initConnection);
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
      initConnection(wsRef.current);
    }

    return () => {
      wsRef.current?.close();
    };
  }, [transport, url, token, initConnection]);
};

export { useWSConnection };
