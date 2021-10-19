import { makeAutoObservable } from 'mobx';

import * as service from './userStore.service';

export interface IUserData {
  isAuth: boolean;
  name: string;
  error: string | null;
}

const initUser: IUserData = {
  isAuth: false,
  name: 'SuperUser',
  error: null,
};

export class UserStore {
  public user: IUserData = initUser;

  constructor() {
    makeAutoObservable(this);
  }

  public signIn = () => {
    this.user = {
      ...this.user,
      isAuth: true,
    };
  };

  public changeUserName = (newName: string) => {
    this.user = {
      ...this.user,
      name: newName,
    };
  };

  public logout = async () => {
    const result = await service.logout();
    if (result) {
      this.user = initUser;
    }
    return result;
  };
}

export default new UserStore();
