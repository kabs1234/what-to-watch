import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import { AppRoute } from '../../const';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.MyList} element={<MyList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
