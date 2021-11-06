import { useCallback } from 'react';
import { useObserver } from 'mobx-react';

import { wsStore } from '../mobx';

interface Message {
  type: string;
  data?: Record<string, unknown> | string;
}

interface UseWsActionsReturn {
  sendWsMsg: (event: string, message: Message) => void;
  listenWsMsg: (event: string, callback: (message: Message) => void) => void;
}

const useWSActions = (): UseWsActionsReturn => {
  const ws = useObserver(() => wsStore.ws);

  const sendWsMsg = (event: string, message: Message) => {
    ws?.emit(event, JSON.stringify(message));
  };

  const listenWsMsg = useCallback(
    (event: string, callback: (message: Message) => void) => {
      ws?.on(event, (message: Message) => {
        callback(message);
      });
    },
    [ws]
  );

  return { sendWsMsg, listenWsMsg };
};

export { useWSActions };
