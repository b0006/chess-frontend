import { AxiosResponse } from 'axios';

import { HTTP as axios } from './axios';

export type UnknownObject = Record<string, unknown>;

export interface ErrorApi {
  statusCode: number;
  error: string;
}

const timeout = 60000;

const requests = {
  POST<T = UnknownObject, R = UnknownObject>(path: string, data?: T): Promise<AxiosResponse<R, any>> {
    return axios.post(path, data, { timeout });
  },

  PUT<T = UnknownObject, R = UnknownObject>(path: string, data?: T): Promise<AxiosResponse<R, any>> {
    return axios.put(path, data, { timeout });
  },

  GET<T = UnknownObject, R = UnknownObject>(path: string, params?: T): Promise<AxiosResponse<R, any>> {
    return axios.get(path, {
      params,
      timeout,
    });
  },
};

export { requests };
