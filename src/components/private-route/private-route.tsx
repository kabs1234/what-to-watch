import { useEffect } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { redirectToRouteAction } from '../../store/actions';
import { isAuthorized } from '../../utils/general';

type PrivateRouteType = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

export default function PrivateRoute({
  authorizationStatus,
  children,
}: PrivateRouteType): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !isAuthorized(authorizationStatus) &&
      authorizationStatus !== AuthorizationStatus.Unknown
    ) {
      dispatch(redirectToRouteAction(AppRoute.SignIn));
    }
  }, [authorizationStatus, dispatch]);

  return children;
}
