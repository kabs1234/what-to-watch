import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import { AppRoute } from '../../const';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import { Provider } from 'react-redux';
import { store } from '../../store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Main />} />
          <Route path={AppRoute.SignIn} element={<SignIn />} />
          <Route path={AppRoute.MyList} element={<MyList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
