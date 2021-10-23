import { AxiosResponse } from 'axios';

import { HTTP as axios } from './axios';

export type UnknownObject = Record<string, unknown>;

const timeout = 60000;

const requests = {
  POST<T = UnknownObject, R = UnknownObject>(path: string, data?: T): Promise<AxiosResponse<R, any>> {
    return axios.post(path, data, { timeout }) as Promise<AxiosResponse<R>>;
  },

  PUT<T = UnknownObject, R = UnknownObject>(path: string, data?: T): Promise<AxiosResponse<R, any>> {
    return axios.put(path, data, { timeout }) as Promise<AxiosResponse<R>>;
  },

  GET<T = UnknownObject, R = UnknownObject>(path: string, params?: T): Promise<AxiosResponse<R, any>> {
    return axios.get(path, {
      params,
      timeout,
    }) as Promise<AxiosResponse<R>>;
  },
};

export { requests };
