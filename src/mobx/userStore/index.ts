import { makeAutoObservable } from 'mobx';

import { requests as agent } from '../../agent';

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

    agent
      .GET<any, ProfileData>('/auth/profile')
      .then((response) => {
        this.setProfileData(response.data);
      })
      .catch((err) => err);
  }

  public setProfileData = (data: ProfileData) => {
    this.user = {
      isAuth: true,
      profileData: data,
    };
  };

  public resetProfileData = () => {
    this.user = initUser;
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
