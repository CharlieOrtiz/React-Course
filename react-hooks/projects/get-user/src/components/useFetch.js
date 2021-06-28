import { useState, useEffect } from "react";

const useFetch = (initialUrl) => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const result = await fetch(url);
        const jsonData = await result.json();

        setData(jsonData);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, error }, setUrl];
};

export default useFetch;
