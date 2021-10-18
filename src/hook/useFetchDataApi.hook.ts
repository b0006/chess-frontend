import { useState, useCallback } from 'react';

import agent from '../agent';

type Method = keyof typeof agent;

interface IResponseReturn<R> {
  statusCode: number;
  data?: R;
  message?: string[];
  error?: Error | string | null;
}

interface IResponse<R> {
  isLoading: boolean;
  data: R | undefined;
  error: string | Error | null | undefined;
}

const useFetchDataApi = <T = object, R = object>(url: string, method: Method): [IResponse<R>, (data?: T) => void] => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<R>();
  const [error, setError] = useState<Error | string | null>();

  const fetchData = useCallback(
    async (data?: T) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await agent[method]<T, IResponseReturn<R>>(url, data);
        if (response.data.statusCode !== 200) {
          throw response.data.message;
        }
        setResponseData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [method, url]
  );

  return [{ isLoading, data: responseData, error }, fetchData];
};

export default useFetchDataApi;
