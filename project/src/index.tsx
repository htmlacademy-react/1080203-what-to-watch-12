import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockFilms } from './mocks/films';
import { mockPromo } from './mocks/promo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      promo={mockPromo}
      films={mockFilms}
    />
  </React.StrictMode>
);
