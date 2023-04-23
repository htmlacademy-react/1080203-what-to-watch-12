import { Link, generatePath, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { Film } from '../../types/films-type';
import cn from 'classnames';
import { FilmTabHashes } from '../../const';
import FilmCurrentTab from './film-current-tab';

function FilmTabs({ id, currentFilm }: { id: string; currentFilm: Film | null }): JSX.Element {
  const location = useLocation();

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

      <FilmCurrentTab currentFilm={currentFilm}/>
    </>
  );
}

export default FilmTabs;
