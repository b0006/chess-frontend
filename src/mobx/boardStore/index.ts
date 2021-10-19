import { makeAutoObservable } from 'mobx';

export interface IBoard {
  isRotate: boolean;
}

const initBoardData: IBoard = {
  isRotate: false,
};

export class BoardStore {
  public board: IBoard = initBoardData;

  constructor() {
    makeAutoObservable(this);
  }

  public rotate = () => {
    this.board = {
      ...this.board,
      isRotate: !this.board.isRotate,
    };
  };
}

export default new BoardStore();
