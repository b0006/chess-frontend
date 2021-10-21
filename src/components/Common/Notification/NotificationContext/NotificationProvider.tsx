import React from 'react';
import { createPortal } from 'react-dom';

import { NotificationLayout } from '../NotificationLayout';
import { NotificationItem } from '../NotificationItem';
import { IContent, IOptions } from '../types';
import { generateUUIDv4 } from '../utils';

import { useNotificationContext, ACTIONS } from './NotificationContext';

const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

interface IProps {
  portalTargetSelector?: string;
}

const Provider: React.FC<IProps> = ({ portalTargetSelector, children }) => {
  const [state] = useNotificationContext();

  const portalTarget = canUseDOM
    ? portalTargetSelector
      ? document.querySelector(portalTargetSelector)
      : document.body
    : null;

  return (
    <React.Fragment>
      {children}
      {portalTarget ? (
        createPortal(
          <NotificationLayout>
            {state.list.map((item) => (
              <NotificationItem
                key={item.id}
                id={item.id}
                appearance={item.appearance}
                title={item.content.title}
                description={item.content.description}
                needClose={item.needClose}
              />
            ))}
          </NotificationLayout>,
          portalTarget
        )
      ) : (
        <NotificationLayout />
      )}
    </React.Fragment>
  );
};

export const useNotification = (): {
  addNotification: (content: IContent, options?: IOptions) => string | undefined;
  removeNotification: (id: string) => void;
  removeAllNotifications: () => void;
} => {
  const [state, dispatch] = useNotificationContext();

  const hasAlready = (id: string): boolean => {
    if (!state.list.length) {
      return false;
    }

    return !!state.list.filter((n) => n.id === id).length;
  };

  const add = (content: IContent, options: IOptions = {}): string | undefined => {
    const id = options.id ? options.id : generateUUIDv4();

    if (hasAlready(id)) {
      return;
    }

    dispatch({ type: ACTIONS.add, payload: { content, id, ...options } });

    return id;
  };

  const remove = (id: string): void => {
    if (!hasAlready(id)) {
      return;
    }

    dispatch({ type: ACTIONS.close, payload: { id } });
  };

  const removeAll = (): void => {
    dispatch({ type: ACTIONS.removeAll });
  };

  return {
    addNotification: add,
    removeNotification: remove,
    removeAllNotifications: removeAll,
  };
};

export { Provider };
