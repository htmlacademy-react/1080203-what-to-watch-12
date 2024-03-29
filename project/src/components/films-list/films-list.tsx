import { FilmsListProps } from '../../types/film-list-props-type';
import FilmCard from '../film-card/film-card';
import { MORE_LIKE_THIS_MAX_COUNT, Messages } from '../../const';
import { useAppSelector } from '../../hooks';
import Loading from '../loading/loading';
import Message from '../message/message';
import { getMaxToShow, getIsMyListFilmsLoading } from '../../store/processes/films-process/films-selectors';

function FilmsList({films, isMoreLikeThis, isMyList}: FilmsListProps): JSX.Element {
  const stateMaxToShow = useAppSelector(getMaxToShow);
  const isMyListFilmsLoading = useAppSelector(getIsMyListFilmsLoading);
  const maxToShow = isMyList ? films.length : stateMaxToShow;
  const filmsToShow = films.slice(0, isMoreLikeThis ? MORE_LIKE_THIS_MAX_COUNT : maxToShow);

  if (isMyListFilmsLoading && isMyList) {
    return <Loading />;
  }

  if (!films.length) {
    return <Message message={Messages.EmptyFilmList} />;
  }

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
