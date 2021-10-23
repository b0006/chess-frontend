import { useState, useCallback } from 'react';
import axios from 'axios';

import { ErrorApi, requests, UnknownObject } from '../agent';
import { sleep } from '../utils/time';

type Method = keyof typeof requests;

interface FetchReturn<T> {
  error: string | null;
  response: T | null | undefined;
}

const useFetchDataApi = <T = UnknownObject, R = UnknownObject>(
  url: string,
  method: Method
): [boolean, (data?: T, sleepMs?: number) => Promise<FetchReturn<R>>] => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (data?: T, sleepMs?: number) => {
      setIsLoading(true);
      const resultData: FetchReturn<R> = {
        error: null,
        response: null,
      };

      if (sleepMs) {
        await sleep(sleepMs);
      }

      try {
        const response = await requests[method]<T, R>(url, data);
        if (response.status !== 200) {
          throw response.statusText;
        }

        resultData.response = response.data;
        return resultData;
      } catch (err) {
        resultData.error = 'Unknown error';

        if (axios.isAxiosError(err)) {
          const errorData = err.response?.data as ErrorApi;
          resultData.error = errorData?.error || 'Unknown error';
        } else if (err instanceof Error || typeof err === 'string') {
          resultData.error = err.toString();
        }

        return resultData;
      } finally {
        setIsLoading(false);
      }
    },
    [method, url]
  );

  return [isLoading, fetchData];
};

export { useFetchDataApi };
