import { action, makeAutoObservable, observable } from 'mobx';

import { HTTP } from '../../agent/axios';
import { requests } from '../../agent';

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

const removeHeaderToken = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  HTTP.defaults.headers['Authorization'] = '';
};

const setHeaderToken = (token: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  HTTP.defaults.headers['Authorization'] = `Bearer ${token}`;
};

const TOKEN_KEY = 'user-token-chess';

const initUser: UserData = {
  isAuth: false,
  profileData: null,
};

export class UserStore {
  public token = '';
  public isInitLoading = true;
  public user: UserData = initUser;
  public partyList: Party[] = [];

  constructor() {
    makeAutoObservable(this, {
      token: observable,
      isInitLoading: observable,
      user: observable,
      partyList: observable,
      insertParty: action,
      removeParty: action,
      updatePartyList: action,
      setProfileData: action,
      signInAsGuest: action,
      logout: action,
      saveToken: action,
    });

    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.token = token;
      setHeaderToken(token);

      requests
        .GET<any, ProfileData>('/auth/profile')
        .then((response) => {
          this.setProfileData(response.data);
        })
        .catch((err) => err)
        .finally(() => {
          this.isInitLoading = false;
        });
    } else {
      this.isInitLoading = false;
    }
  }

  public saveToken = (token: string) => {
    this.token = token;
    localStorage.setItem(TOKEN_KEY, token);
    setHeaderToken(token);
  };

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

  public signInAsGuest = () => {
    this.partyList = [];
    this.user = {
      ...this.user,
      isAuth: true,
    };
  };

  public logout = () => {
    this.token = '';
    localStorage.removeItem(TOKEN_KEY);
    removeHeaderToken();
    this.user = initUser;
    this.partyList = [];
  };
}

export default new UserStore();
