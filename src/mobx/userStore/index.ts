import { decorate, observable, action } from 'mobx';

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

  public signIn = () => {
    this.user = {
      ...this.user,
      isAuth: true,
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

decorate(UserStore, {
  user: observable,
  signIn: action,
  logout: action,
});

export default new UserStore();
