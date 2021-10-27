import { makeAutoObservable } from 'mobx';

import { ChessColor } from '../../components/Board/TemplateBoard/types';

export interface GameData {
  isPlaying: boolean; // в состоянии игры
  isVersusAi: boolean; // партия против ИИ
  isAutoPromotion: boolean; // автопревращение пешки
  isColoredMoves: boolean; // подсветка возможных ходов
  isConfirmSteps: boolean; // подтверждать каждый ход через отдельную кнопку
  isAudioOn: boolean; // включить звуки
  difficult?: number | null; // сложность
  myColor: ChessColor; // цвет игрока
}

const initGameData: GameData = {
  isVersusAi: false,
  isPlaying: false,
  isAutoPromotion: false,
  isColoredMoves: true,
  isConfirmSteps: false,
  isAudioOn: false,
  difficult: null,
  myColor: 'w',
};

export class GameStore {
  public game: GameData = initGameData;

  constructor() {
    makeAutoObservable(this);
  }

  public setGameData = (data: GameData) => {
    this.game = { ...this.game, ...data };
  };
}

export default new GameStore();
