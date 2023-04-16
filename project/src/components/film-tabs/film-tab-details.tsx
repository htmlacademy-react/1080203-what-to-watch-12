import { Film } from '../../types/films-type';
import { Symbols } from '../../const';
import { convertMinutesToHouersAndMinutes } from '../../utils';
import React from 'react';

function FilmTabDetails({ currentFilm }: { currentFilm: Film | null}): JSX.Element {
  let key = 0;

  const getStarringList = () => {
    const starringList: React.ReactNode[] | undefined = currentFilm?.starring.map((name, i): React.ReactNode => (
      <React.Fragment key={key++}>
        {name}{currentFilm?.starring.length === i + 1 ? Symbols.Empty : Symbols.Comma}<br/>
      </React.Fragment>
    ));

    return starringList;
  };

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{currentFilm?.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {getStarringList()}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">
            {convertMinutesToHouersAndMinutes(currentFilm?.runTime)}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{currentFilm?.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{currentFilm?.released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmTabDetails;

