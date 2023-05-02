import React from 'react';
import { PropTypes } from 'prop-types';
import ApiContext from './ApiContext';
import useFetchApi from '../Hooks/useFetchApi';

export default function FetchProvider({ children }) {
  const {
    api,
    setApi,
  } = useFetchApi();

  return (
    <ApiContext.Provider
      value={ {
        api,
        setApi,
      } }
    >
      { children }
    </ApiContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
