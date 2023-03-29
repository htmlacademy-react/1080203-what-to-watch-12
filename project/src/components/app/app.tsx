import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes, AuthStatus } from '../../const';
import PrivateRoute from '../private-rout/private-rout';
import MainPage from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { FilmsProps } from '../../types/films-props-type';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import ResetFilmsCount from '../reset-films-count/reset-films-count';

function App({promo, films}: FilmsProps): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <ResetFilmsCount />
        <Routes>
          <Route
            path={AppRoutes.Main}
            element={<MainPage promo={promo} />}
          />
          <Route
            path={AppRoutes.SignIn}
            element={<SignInPage />}
          />
          <Route
            path={AppRoutes.MyList}
            element={
              <PrivateRoute authStatus={AuthStatus.Auth}>
                <MyListPage films={films} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.Film}
            element={<FilmPage />}
          />
          <Route
            path={AppRoutes.AddReview}
            element={<AddReviewPage />}
          />
          <Route
            path={AppRoutes.Player}
            element={<PlayerPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
