import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const';

function UserBlock(): JSX.Element {
  const navigate = useNavigate();

  const clickSignOutHandler = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    // do sign out
  };

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
