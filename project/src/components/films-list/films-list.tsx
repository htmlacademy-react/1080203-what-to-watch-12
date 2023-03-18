import { Films } from '../../types/film-type';
import FilmCard from '../film-card/film-card';

// Вопрос Этот тип повторяется в myList, нужно ли вынести в файл с типами?
type FilmsListProps = {
  films: Films;
}

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
