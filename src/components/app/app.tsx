import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import { AppRoute } from '../../const';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import NotFound from '../../pages/not-found/not-found';
import { useAppSelector } from '../../hooks';
import { getAreFilmsLoading } from '../../store/selectors';
import Loading from '../loading/loading';

function App(): JSX.Element {
  const areOffersLoading = useAppSelector(getAreFilmsLoading);

  if (areOffersLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.MyList} element={<MyList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
