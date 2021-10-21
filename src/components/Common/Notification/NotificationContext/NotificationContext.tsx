import React, { createContext, useContext, useReducer } from 'react';

export enum ACTIONS {
  add,
  update,
  remove,
  removeAll,
  close,
}

export interface IState {
  list: any[];
}

type Action =
  | { type: ACTIONS.add; payload: any }
  | { type: ACTIONS.close; payload: any }
  | { type: ACTIONS.remove; payload: any }
  | { type: ACTIONS.removeAll };

export type TDispatch = React.Dispatch<Action>;

const initialState: IState = {
  list: [],
};

const NotificationStateContext = createContext(initialState);
const NotificationDispatchContext = createContext<TDispatch>(() => ({}));

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case ACTIONS.add: {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }
    case ACTIONS.close: {
      return {
        ...state,
        list: state.list.map((n) => {
          if (n.id !== action.payload.id) {
            return n;
          }

          return {
            ...n,
            needClose: true,
          };
        }),
      };
    }
    case ACTIONS.remove: {
      return {
        ...state,
        list: state.list.filter((n) => n.id !== action.payload.id),
      };
    }
    case ACTIONS.removeAll: {
      return {
        ...state,
        list: state.list.map((n) => ({
          ...n,
          needClose: true,
        })),
      };
    }
    default: {
      return state;
    }
  }
};

const NotificationProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>{children}</NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
};

const useNotificationState = (): IState => {
  const context = useContext(NotificationStateContext);
  if (typeof context === 'undefined') {
    throw new Error('useNotificationState must be used within a NotificationProvider');
  }
  return context;
};

const useNotificationDispatch = (): TDispatch => {
  const context = useContext(NotificationDispatchContext);
  if (typeof context === 'undefined') {
    throw new Error('useNotificationDispatch must be used within a NotificationProvider');
  }
  return context;
};

const useNotificationContext = (): [IState, TDispatch] => [useNotificationState(), useNotificationDispatch()];

export { NotificationProvider, useNotificationContext };
