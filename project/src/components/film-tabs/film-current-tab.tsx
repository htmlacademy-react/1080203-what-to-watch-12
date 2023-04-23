import { useLocation } from 'react-router-dom';
import { Film } from '../../types/films-type';
import FilmTabOverview from './film-tab-overview';
import FilmTabDetails from './film-tab-details';
import FilmTabReviews from './film-tab-reviews';
import { FilmTabHashes } from '../../const';

function FilmCurrentTab({ currentFilm }: { currentFilm: Film | null }): JSX.Element {
  const location = useLocation();

  let currentTabComponent = <FilmTabOverview currentFilm={currentFilm} />;

  switch (location.hash) {
    case FilmTabHashes.Overview:
      currentTabComponent = <FilmTabOverview currentFilm={currentFilm} />;
      break;
    case FilmTabHashes.Details:
      currentTabComponent = <FilmTabDetails currentFilm={currentFilm} />;
      break;
    case FilmTabHashes.Reviews:
      currentTabComponent = <FilmTabReviews currentFilm={currentFilm} />;
      break;
  }

  return currentTabComponent;
}

export default FilmCurrentTab;
