import { AxiosResponse } from 'axios';

import { HTTP as axios } from './axios';

const timeout = 60000;

const requests = {
  POST<T = object, R = object>(path: string, data?: T) {
    return axios.post(path, data, { timeout }) as Promise<AxiosResponse<R>>;
  },

  PUT<T = object, R = object>(path: string, data?: T) {
    return axios.put(path, data, { timeout }) as Promise<AxiosResponse<R>>;
  },

  GET<T = object, R = object>(path: string, params?: T) {
    return axios.get(path, {
      params,
      timeout,
    }) as Promise<AxiosResponse<R>>;
  },
};

export { requests };
