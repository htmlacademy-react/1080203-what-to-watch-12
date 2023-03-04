import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const FilmInfo = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  release: 2014
} as const;

root.render(
  <React.StrictMode>
    <App
      title = {FilmInfo.title}
      genre = {FilmInfo.genre}
      release = {FilmInfo.release}
    />
  </React.StrictMode>,
);
