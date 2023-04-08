import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../const';
import PrivateRoute from '../private-rout/private-rout';
import MainPage from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { FilmsProps } from '../../types/films-props-type';
import Container from '../container/container';

function App({promo}: FilmsProps): JSX.Element {
  return (
    <BrowserRouter>
      <Container>
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
              <PrivateRoute>
                <MyListPage />
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
      </Container>
    </BrowserRouter>
  );
}

export default App;
