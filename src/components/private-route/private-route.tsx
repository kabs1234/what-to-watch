import { AppRoute, AuthorizationStatus } from '../../const';
import { isAuthorized } from '../../utils/general';
import { Navigate } from 'react-router-dom';

type PrivateRouteType = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

export default function PrivateRoute({
  authorizationStatus,
  children,
}: PrivateRouteType): JSX.Element {
  if (
    !isAuthorized(authorizationStatus) &&
    authorizationStatus !== AuthorizationStatus.Unknown
  ) {
    return <Navigate to={AppRoute.SignIn} />;
  }

  return children;
}
