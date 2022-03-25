import { useState, useEffect, useCallback, useRef } from 'react';
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //activeHttpRequest will not be reinitialized when
  // the function runs again because of useRef. This
  // is used in case the user changes pages during the
  // execution of this function (e.g., during a http request that
  // is slow to respond)
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrll = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrll);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    //clean up function
    return () => {
      activeHttpRequests.current.forEach((AbortCtrl) => AbortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
