import { Film } from '../../types/films-type';
import { useMemo } from 'react';
import { FILM_LEVELS, SYMBOLS } from '../../const';

function FilmTabOverview({ currentFilm }: { currentFilm: Film | null}): JSX.Element {
  const getLevelByRating = (filmRating: number | undefined) => {
    let currentLevel = '';
    const rating = filmRating === undefined ? 0 : filmRating;

    switch (true) {
      case rating >= FILM_LEVELS.BAD.MIN && rating <= FILM_LEVELS.BAD.MAX:
        currentLevel = FILM_LEVELS.BAD.NAME;
        break;
      case rating >= FILM_LEVELS.NORMAL.MIN && rating <= FILM_LEVELS.NORMAL.MAX:
        currentLevel = FILM_LEVELS.NORMAL.NAME;
        break;
      case rating >= FILM_LEVELS.GOOD.MIN && rating <= FILM_LEVELS.GOOD.MAX:
        currentLevel = FILM_LEVELS.GOOD.NAME;
        break;
      case rating >= FILM_LEVELS.VERY_GOOD.MIN && rating <= FILM_LEVELS.VERY_GOOD.MAX:
        currentLevel = FILM_LEVELS.VERY_GOOD.NAME;
        break;
      case rating === FILM_LEVELS.AWESOME.MAX:
        currentLevel = FILM_LEVELS.AWESOME.NAME;
        break;
    }

    return currentLevel;
  };

  const currentLevel: string = useMemo(() => getLevelByRating(currentFilm?.rating), [currentFilm?.rating]);
  const starringList = useMemo(() => currentFilm?.starring.join(SYMBOLS.COMMA_AND_SPACE), [currentFilm?.starring]);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{currentFilm?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{currentLevel}</span>
          <span className="film-rating__count">{currentFilm?.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{currentFilm?.description}</p>

        <p className="film-card__director"><strong>Director: {currentFilm?.director}</strong></p>

        <p className="film-card__starring">
          <strong>
            Starring: {starringList}
          </strong>
        </p>
      </div>
    </>
  );
}

export default FilmTabOverview;
