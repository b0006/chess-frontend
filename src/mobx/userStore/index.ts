import { action, makeAutoObservable, observable } from 'mobx';

import { requests as agent } from '../../agent';

import * as service from './userStore.service';

export interface Party {
  id: string;
  creater: string;
  whitePlayer: string | null;
  blackPlayer: string | null;
  winPlayer: string | null;
  resultParty: string | null;
  isVersusAi: boolean;
  isPlaying: boolean;
}

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
  public partyList: Party[] = [];

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      partyList: observable,
      insertParty: action,
      removeParty: action,
      updatePartyList: action,
      setProfileData: action,
      signInAsGuest: action,
      logout: action,
      resetProfileData: action,
    });

    agent
      .GET<any, ProfileData>('/auth/profile')
      .then((response) => {
        this.setProfileData(response.data);
      })
      .catch((err) => err);
  }

  public insertParty = (partyData: Party) => {
    this.partyList = [...this.partyList, partyData];
  };

  public removeParty = (partyId: string) => {
    const findParty = this.partyList.find((party) => party.id === partyId);
    if (findParty) {
      this.partyList.filter((party) => party.id !== findParty.id);
    }
  };

  public updatePartyList = (list: any[]) => {
    this.partyList = list;
  };

  public setProfileData = (data: ProfileData) => {
    this.user = {
      ...this.user,
      isAuth: true,
      profileData: data,
    };
  };

  public resetProfileData = () => {
    this.user = initUser;
    this.partyList = [];
  };

  public signInAsGuest = () => {
    this.partyList = [];
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
