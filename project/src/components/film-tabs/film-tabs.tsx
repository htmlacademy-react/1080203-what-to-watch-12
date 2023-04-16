import { Link, generatePath, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { Film } from '../../types/films-type';
import cn from 'classnames';
import FilmTabOverview from './film-tab-overview';
import FilmTabDetails from './film-tab-details';
import FilmTabReviews from './film-tab-reviews';
import { FilmTabHashes } from '../../const';

function FilmTabs({ id, currentFilm }: { id: string; currentFilm: Film | null }): JSX.Element {
  const location = useLocation();

  const getCurrentTabComponent = () => {
    let currentTabComponent;

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
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li
            className={cn(
              'film-nav__item',
              {'film-nav__item--active': location.hash === FilmTabHashes.Overview}
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
              {'film-nav__item--active': location.hash === FilmTabHashes.Details}
            )}
          >
            <Link
              to={generatePath(AppRoutes.Tabs, { id: id, tabhash: FilmTabHashes.Details })}
              className="film-nav__link"
            >
              Details
            </Link>
          </li>
          <li
            className={cn(
              'film-nav__item',
              {'film-nav__item--active': location.hash === FilmTabHashes.Reviews}
            )}
          >
            <Link
              to={generatePath(AppRoutes.Tabs, { id: id, tabhash: FilmTabHashes.Reviews })}
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
