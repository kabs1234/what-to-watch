import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import { AppRoute } from '../../const';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import NotFound from '../../pages/not-found/not-found';
import { useAppSelector } from '../../hooks';
import {
  getAreFilmsLoading,
  getAuthorizationStatus,
} from '../../store/selectors';
import Loading from '../loading/loading';
import Film from '../../pages/film/film';
import PrivateRoute from '../private-route/private-route';
import AddReview from '../../pages/add-review/add-review';

function App(): JSX.Element {
  const areOffersLoading = useAppSelector(getAreFilmsLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (areOffersLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Main />} />
      <Route path={AppRoute.SignIn} element={<SignIn />} />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <MyList />
          </PrivateRoute>
        }
      />
      <Route path={`${AppRoute.Films}/:id`} element={<Film />} />
      <Route path={`${AppRoute.Films}/:id/review`} element={<AddReview />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
