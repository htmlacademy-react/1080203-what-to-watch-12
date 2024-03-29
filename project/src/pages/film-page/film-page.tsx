import { useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';
import FilmsList from '../../components/films-list/films-list';
import FilmTabs from '../../components/film-tabs/film-tabs';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Loading from '../../components/loading/loading';
import { getSingleFilmAction, getSimilarFilmsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { resetIsSingleFilmLoading } from '../../store/processes/films-process/films-process';
import AddReviewButton from '../../components/add-review-button/add-review-button';
import { AppRoutes, Symbols } from '../../const';
import { getCurrentFilm, getSimilarFilms, getIsSingleFilmLoading } from '../../store/processes/films-process/films-selectors';
import { redirectToRoute } from '../../store/actions';

function FilmPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const currentFilm = useAppSelector(getCurrentFilm);
  const isSingleFilmLoading = useAppSelector(getIsSingleFilmLoading);
  const similarFilms = useAppSelector(getSimilarFilms);

  useEffect(() => {
    dispatch(resetIsSingleFilmLoading());

    if (id) {
      dispatch(getSingleFilmAction(id));
      dispatch(getSimilarFilmsAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!isSingleFilmLoading && !currentFilm) {
      dispatch(redirectToRoute(AppRoutes.NotFound));
      dispatch(resetIsSingleFilmLoading());
    }
  }, [dispatch, isSingleFilmLoading, currentFilm]);

  if (isSingleFilmLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm?.genre}</span>
                <span className="film-card__year">{currentFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton id={id ?? Symbols.Empty} />

                <MyListButton filmId={id?.toString()} />

                <AddReviewButton id={id} />
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm?.posterImage} alt={currentFilm?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <FilmTabs id={id ?? Symbols.Empty} currentFilm={currentFilm} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms} isMoreLikeThis />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default FilmPage;
