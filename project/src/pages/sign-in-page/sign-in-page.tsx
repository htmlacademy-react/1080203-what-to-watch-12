import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { useRef, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthData } from '../../types/auth-data-type';
import { loginAction } from '../../store/api-actions';
import { AuthStatuses, AppRoutes, Messages, SHOW_ERROR_DURATION } from '../../const';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/processes/user-process/user-selectors';
import { isEmail, isPassword } from '../../utils';
import Error from '../../components/error/error';

function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthStatuses.Auth;
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginRef.current && passwordRef.current && isEmail(loginRef.current?.value) && isPassword(passwordRef.current?.value)) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, SHOW_ERROR_DURATION);
    }
  });

  useEffect(() => {
    if (isAuth) {
      navigate(AppRoutes.Main);
    }
  }, [isAuth, navigate]);

  return (
    <div className="user-page">
      <Error showError={showError} message={Messages.WrongLoginOrPass} />

      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={submitHandler}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={loginRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignInPage;
