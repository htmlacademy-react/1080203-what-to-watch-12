import { Link, generatePath, useLocation } from 'react-router-dom';
import { AppRoutes, GENRES } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeGenre } from '../../store/processes/films-process/films-process';
import { useAppSelector } from '../../hooks';
import cn from 'classnames';
import { useEffect } from 'react';
import { getCurrentGenre, getCurrentFilms } from '../../store/processes/films-process/films-selectors';

function GenresList(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(getCurrentGenre);
  const currentFilms = useAppSelector(getCurrentFilms);

  useEffect(() => {
    if (!location.hash && currentGenre) {
      dispatch(changeGenre(GENRES.ALL.HASH));
    }
  }, [location.hash, currentGenre, dispatch]);

  const getGenresList = () => {
    const genresSet = new Set<string>();

    currentFilms.map((film) => genresSet.add(film.genre));

    const genresList: string[] = [GENRES.ALL.NAME];

    Array.from(genresSet).forEach((genre) => {
      genresList.push(genre);
    });

    return genresList;
  };

  const getHashByGenre = (genre: string): string => `#${genre.toLocaleLowerCase()}`;

  return (
    <ul className="catalog__genres-list">

      {getGenresList().map((genre) => (
        <li
          className={cn(
            'catalog__genres-item',
            {'catalog__genres-item--active': currentGenre === genre}
          )}
          key={genre}
        >
          <Link
            to={generatePath(AppRoutes.Genre, { genre: getHashByGenre(genre) })}
            className="catalog__genres-link"
            onClick={() => dispatch(changeGenre(genre))}
          >
            {genre || GENRES.ALL.TITLE }
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
