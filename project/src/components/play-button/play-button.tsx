import { useNavigate, generatePath } from 'react-router-dom';
import { AppRoutes, SYMBOLS } from '../../const';
import { FilmId } from '../../types/film-id-type';

function PlayButton({ id }: FilmId): JSX.Element {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn--play film-card__button"
      type="button"
      onClick={() => navigate(generatePath(AppRoutes.Player, { id: id ?? SYMBOLS.EMPTY}))}
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default PlayButton;
