import { Link, generatePath, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { Film } from '../../types/films-type';
import cn from 'classnames';
import FilmTabOverview from './film-tab-overview';
import FilmTabDetails from './film-tab-details';
import FilmTabReviews from './film-tab-reviews';
import { FILM_TAB_HASHES } from '../../const';

function FilmTabs({ id, currentFilm }: { id: string; currentFilm: Film | null }): JSX.Element {
  const location = useLocation();

  const getCurrentTabComponent = () => {
    let currentTabComponent;

    switch (location.hash) {
      case FILM_TAB_HASHES.OVERVIEW:
        currentTabComponent = <FilmTabOverview currentFilm={currentFilm} />;
        break;
      case FILM_TAB_HASHES.DETAILS:
        currentTabComponent = <FilmTabDetails currentFilm={currentFilm} />;
        break;
      case FILM_TAB_HASHES.REVIEWS:
        currentTabComponent = <FilmTabReviews currentFilm={currentFilm} />;
        break;
    }

    return currentTabComponent;
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li
            className={cn(
              'film-nav__item',
              {'film-nav__item--active': location.hash === FILM_TAB_HASHES.OVERVIEW}
            )}
          >
            <Link
              to={generatePath(AppRoutes.Film, { id: id })}
              className="film-nav__link"
            >
              Overview
            </Link>
          </li>
          <li
            className={cn(
              'film-nav__item',
              {'film-nav__item--active': location.hash === FILM_TAB_HASHES.DETAILS}
            )}
          >
            <Link
              to={generatePath(AppRoutes.Tabs, { id: id, tabhash: FILM_TAB_HASHES.DETAILS })}
              className="film-nav__link"
            >
              Details
            </Link>
          </li>
          <li
            className={cn(
              'film-nav__item',
              {'film-nav__item--active': location.hash === FILM_TAB_HASHES.REVIEWS}
            )}
          >
            <Link
              to={generatePath(AppRoutes.Tabs, { id: id, tabhash: FILM_TAB_HASHES.REVIEWS })}
              className="film-nav__link"
            >
              Reviews
            </Link>
          </li>
        </ul>
      </nav>

      {getCurrentTabComponent()}
    </>
  );
}

export default FilmTabs;
