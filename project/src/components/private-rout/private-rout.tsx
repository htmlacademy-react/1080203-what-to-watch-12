import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const { children } = props;

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoutes.SignIn} />
  );
}

export default PrivateRoute;
