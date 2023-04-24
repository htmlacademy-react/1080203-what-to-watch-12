import { useState } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { FilmCardProps } from '../../types/film-card-props-type';
import PreviewVideo from '../preview-video/preview-video';

function FilmCard({previewImage, previewVideo, name, id}: FilmCardProps): JSX.Element {
  const [, setHoveredFilmCard] = useState<number|null>(null);

  const onMouseEnter = () => {
    setHoveredFilmCard(id);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onMouseEnter}>
      <Link to={generatePath(AppRoutes.Film, { id: id.toString() })} className="small-film-card__link">
        <PreviewVideo posterSrc={previewImage} previewSrc={previewVideo} />
      </Link>

      <h3 className="small-film-card__title">
        <Link to={generatePath(AppRoutes.Film, { id: id.toString() })} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
