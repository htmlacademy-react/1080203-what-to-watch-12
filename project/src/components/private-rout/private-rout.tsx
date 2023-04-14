import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element | null {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const { children } = props;

  if (authStatus === AuthStatus.Auth) {
    return children;
  }

  if (authStatus === AuthStatus.NoAuth) {
    return <Navigate to={AppRoutes.SignIn} />;
  }

  return null;
}

export default PrivateRoute;
