import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base/globals.scss';
import Router from 'Router';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
