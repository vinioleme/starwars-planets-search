import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FetchProvider from './Context/FetchProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <FetchProvider>
      <App />
    </FetchProvider>,
  );
