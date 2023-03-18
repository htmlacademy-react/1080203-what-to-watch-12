import { FilmsListProps } from '../../types/film-list-props';
import FilmCard from '../film-card/film-card';

function FilmsList({films}: FilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
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
