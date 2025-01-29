import { useEffect } from 'react';
import { AppRoute, AuthorizationStatus, isAuthorized } from '../../const';
import { useAppDispatch } from '../../hooks';
import { redirectToRouteAction } from '../../store/actions';

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
    if (!isAuthorized(authorizationStatus)) {
      dispatch(redirectToRouteAction(AppRoute.SignIn));
    }
  }, [authorizationStatus, dispatch]);

  return children;
}
