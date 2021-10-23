import { makeAutoObservable } from 'mobx';

import * as service from './userStore.service';

export interface ProfileData {
  id: string;
  username: string;
  email: string;
}

export interface UserData {
  isAuth: boolean;
  profileData: ProfileData | null;
}

const initUser: UserData = {
  isAuth: false,
  profileData: null,
};

export class UserStore {
  public user: UserData = initUser;

  constructor() {
    makeAutoObservable(this);
  }

  public signIn = (data: ProfileData) => {
    this.user = {
      isAuth: true,
      profileData: data,
    };
  };

  public signInAsGuest = () => {
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

export default new UserStore();
