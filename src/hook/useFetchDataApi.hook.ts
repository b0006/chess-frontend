import { useState, useCallback } from 'react';

import { requests } from '../agent';

type Method = keyof typeof requests;

interface ResponseReturn<R> {
  statusCode: number;
  data?: R;
  message?: string[];
  error?: Error | string | null;
}

interface Response<R> {
  isLoading: boolean;
  data: R | undefined;
  error: string | Error | null | undefined;
}

const useFetchDataApi = <T = object, R = object>(url: string, method: Method): [Response<R>, (data?: T) => void] => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<R>();
  const [error, setError] = useState<Error | string | null>();

  const fetchData = useCallback(
    async (data?: T) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await requests[method]<T, ResponseReturn<R>>(url, data);
        if (response.data.statusCode !== 200) {
          throw response.data.message;
        }
        setResponseData(response.data.data);
      } catch (err) {
        if (err instanceof Error || typeof err === 'string') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [method, url]
  );

  return [{ isLoading, data: responseData, error }, fetchData];
};

export { useFetchDataApi };
