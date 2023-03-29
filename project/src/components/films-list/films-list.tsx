import { FilmsListProps } from '../../types/film-list-props-type';
import FilmCard from '../film-card/film-card';
import { MORE_LIKE_THIS_MAX_COUNT } from '../../const';
import { useAppSelector } from '../../hooks';

function FilmsList({films, isMoreLikeThis, isMyList}: FilmsListProps): JSX.Element {
  const maxToShow = useAppSelector((state) => isMyList ? films.length : state.maxToShow);
  const filmsToShow = isMoreLikeThis ? films.slice(0, MORE_LIKE_THIS_MAX_COUNT) : films.slice(0, maxToShow);

  return (
    <div className="catalog__films-list">
      {filmsToShow.map((film) => (
        <FilmCard
          key={film.id}
          previewImage={film.previewImage}
          previewVideo={film.previewVideoLink}
          name={film.name}
          id={film.id}
        />
      ))}
    </div>
  );
}

export default FilmsList;
