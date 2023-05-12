import { useEffect, useState } from 'react';

export default function useFetchApi() {
  const [api, setApi] = useState([]);
  const [search, setSearch] = useState([]);
  const [planets, setPlanets] = useState([]);

  const requestFetch = async () => {
    const response = await fetch('https://swapi.dev/api/planets');

    try {
      const json = await response.json();

      setApi(json.results);

      setSearch(json.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    requestFetch();
  }, []);

  return {
    api,
    setApi,
    search,
    setSearch,
    planets,
    setPlanets,
  };
}
