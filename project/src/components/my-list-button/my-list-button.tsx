import { useNavigate } from 'react-router-dom';
import { AppRoutes, AuthStatuses, MyListStatuses, MyListButtonStatuses } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFilmInMyListAction, getMyListFilmsAction } from '../../store/api-actions';
import { MyListButtonProps } from '../../types/my-list-button-props-type';
import { getMyListFilms } from '../../store/processes/films-process/films-selectors';
import { getAuthorizationStatus } from '../../store/processes/user-process/user-selectors';
import { resetMyListFilms } from '../../store/processes/films-process/films-process';
import { useEffect } from 'react';

function MyListButton({ filmId }: MyListButtonProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myListFilms = useAppSelector(getMyListFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFilmInMyList = myListFilms.find((film) => film.id.toString() === filmId);
  const isUserAuth = authorizationStatus === AuthStatuses.Auth;

  useEffect(() => {
    if (!isUserAuth && myListFilms.length) {
      dispatch(resetMyListFilms());
    }

    if (authorizationStatus === AuthStatuses.Auth && !myListFilms.length) {
      dispatch(getMyListFilmsAction());
    }
  }, [isUserAuth, authorizationStatus, dispatch, myListFilms.length]);

  const myListButtonClickHandler = () => {
    if (authorizationStatus !== AuthStatuses.Auth) {
      navigate(AppRoutes.SignIn);
      return;
    }

    dispatch(
      addFilmInMyListAction({
        id: filmId,
        status: (isFilmInMyList ? MyListStatuses.Remove : MyListStatuses.Add)
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
        <use xlinkHref={isFilmInMyList ? MyListButtonStatuses.InList : MyListButtonStatuses.Add}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{myListFilms.length}</span>
    </button>
  );
}

export default MyListButton;
