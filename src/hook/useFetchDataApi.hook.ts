import { useState, useCallback } from 'react';

import { requests, UnknownObject } from '../agent';

type Method = keyof typeof requests;

interface FetchReturn<T> {
  error: string | Error | null | unknown;
  response: T | null | undefined;
}

const useFetchDataApi = <T = UnknownObject, R = UnknownObject>(
  url: string,
  method: Method
): [boolean, (data?: T) => Promise<FetchReturn<R>>] => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (data?: T) => {
      setIsLoading(true);
      const resultData: FetchReturn<R> = {
        error: null,
        response: null,
      };

      try {
        const response = await requests[method]<T, R>(url, data);
        if (response.status !== 200) {
          throw response.statusText;
        }

        resultData.response = response.data;
        return resultData;
      } catch (err) {
        resultData.error = 'Unknown error';

        if (err instanceof Error || typeof err === 'string') {
          resultData.error = err;
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
