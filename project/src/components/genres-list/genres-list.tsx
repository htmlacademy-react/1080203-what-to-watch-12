import { Link, generatePath } from 'react-router-dom';
import { AppRoutes, GENRES } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeGenre } from '../../store/actions';
import { useAppSelector } from '../../hooks';
import cn from 'classnames';

function GenresList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector((state) => state.genre);
  const currentFilms = useAppSelector((state) => state.sourceFilms);

  const getGenresList = (): string[] => {
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
            onClick={() => dispatch(changeGenre({ genre }))}
          >
            {genre || GENRES.ALL.TITLE }
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
