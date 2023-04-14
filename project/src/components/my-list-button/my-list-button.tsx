import { useNavigate } from 'react-router-dom';
import { AppRoutes, AuthStatus, MY_LIST_STATUSES, MY_LIST_BUTTON_STATUSES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFilmInMyListAction } from '../../store/api-actions';
import { MyListButtonProps } from '../../types/my-list-button-props-type';

function MyListButton({ filmId }: MyListButtonProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myListFilms = useAppSelector((state) => state.myListFilms);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const isFilmInMyList = () => myListFilms.find((film) => film.id.toString() === filmId);

  const myListButtonClickHandler = () => {
    if (authorizationStatus !== AuthStatus.Auth) {
      navigate(AppRoutes.SignIn);
      return;
    }

    dispatch(
      addFilmInMyListAction({
        id: filmId,
        status: (isFilmInMyList() ? MY_LIST_STATUSES.REMOVE : MY_LIST_STATUSES.ADD)
      })
    );
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={myListButtonClickHandler}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isFilmInMyList() ? MY_LIST_BUTTON_STATUSES.IN_LIST : MY_LIST_BUTTON_STATUSES.ADD}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{myListFilms.length}</span>
    </button>
  );
}

export default MyListButton;
