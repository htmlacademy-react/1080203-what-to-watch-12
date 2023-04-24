import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthStatuses } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/processes/user-process/user-selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element | null {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const { children } = props;

  if (authStatus === AuthStatuses.Auth) {
    return children;
  }

  if (authStatus === AuthStatuses.NoAuth) {
    return <Navigate to={AppRoutes.SignIn} />;
  }

  return null;
}

export default PrivateRoute;
