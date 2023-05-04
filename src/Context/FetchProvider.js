import React from 'react';
import { PropTypes } from 'prop-types';
import mainContext from './mainContext';
import useFetchApi from '../Hooks/useFetchApi';

export default function FetchProvider({ children }) {
  const {
    api,
    setApi,
    search,
    setSearch,
    planets,
    setPlanets,
  } = useFetchApi();

  return (
    <mainContext.Provider
      value={ {
        api,
        setApi,
        search,
        setSearch,
        planets,
        setPlanets,
      } }
    >
      { children }
    </mainContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
