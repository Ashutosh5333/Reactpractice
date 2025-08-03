// useCachedFetch.js
import { useState, useEffect } from "react";
import { getFromCache, setToCache } from "./cache";

const useCachedFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const cachedData = getFromCache(url);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setToCache(url, response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useCachedFetch;