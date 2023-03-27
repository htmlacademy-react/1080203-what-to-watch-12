import { Link, generatePath } from 'react-router-dom';
import { AppRoutes, GENRES } from '../../const';
import { useAppDispatch } from '../../hooks';
import { mockFilms } from '../../mocks/films';
import { changeGenre } from '../../store/actions';
import { useAppSelector } from '../../hooks';
import cn from 'classnames';

function GenresList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector((state) => state.genre);

  const getGenresList = (): string[] => {
    const genresSet = new Set<string>();

    mockFilms.map((film) => genresSet.add(film.genre));

    const genresList: string[] = [''];

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
