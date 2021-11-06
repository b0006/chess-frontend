import { action, makeAutoObservable, observable } from 'mobx';
import { Socket } from 'socket.io-client';

export interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export type WS = Socket<DefaultEventsMap, DefaultEventsMap>;

export class WsStore {
  public ws: WS | null = null;

  constructor() {
    makeAutoObservable(this, {
      ws: observable,
      initConnection: action,
    });
  }

  public initConnection = (socket: WS) => {
    this.ws = socket;
  };
}

export default new WsStore();
