import {useState} from 'react';
import { Link, generatePath } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { FilmCardProps } from '../../types/film-card-props';

function FilmCard({previewImage, name, id}: FilmCardProps): JSX.Element {
  const [hoveredFilmCard, setHoveredFilmCard] = useState<number|null>(null);

  const onMouseEnter = (filmId: number): number|null => {
    setHoveredFilmCard(id);

    return hoveredFilmCard;
  };

  return (
    // Вопрос Можно ли и нужно ли обойтись без анонимной функции?
    // Вопрос Надо ли что-то возвращать и если да, то как это получить в компоненте-родителе?
    <article className="small-film-card catalog__films-card" onMouseEnter={() => onMouseEnter(id)}>
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={generatePath(AppRoutes.Film, { id: `${id}` })} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
