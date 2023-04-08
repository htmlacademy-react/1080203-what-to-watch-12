import { MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppRoutes, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { logout } from '../../store/actions';

function UserBlock(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();

  const clickSignOutHandler = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    store.dispatch(logout());
  };

  if (authStatus !== AuthStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link
            to={AppRoutes.SignIn}
            className="user-block__link"
          >
            Sign in
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div
          className="user-block__avatar"
          onClick={() => navigate(AppRoutes.MyList)}
        >
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <a
          href="/"
          className="user-block__link"
          onClick={clickSignOutHandler}
        >
          Sign out
        </a>
      </li>
    </ul>
  );
}

export default UserBlock;
