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
import { getFilmByIdAction, getSimilarFilmsdAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { resetIsSingleFilmLoading } from '../../store/actions';
import AddReviewButton from '../../components/add-review-button/add-review-button';
import { SYMBOLS } from '../../const';

function FilmPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const currentFilm = useAppSelector((state) => state.singleFilm);
  const isSingleFilmLoading = useAppSelector((state) => state.isSingleFilmLoading);
  const similarFilms = useAppSelector((state) => state.similarFilms);

  useEffect(() => {
    dispatch(resetIsSingleFilmLoading());

    if (id) {
      dispatch(getFilmByIdAction(id));
      dispatch(getSimilarFilmsdAction(id));
    }
  }, [id, dispatch]);

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
                <PlayButton id={id ?? SYMBOLS.EMPTY} />

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
              <FilmTabs id={id ?? SYMBOLS.EMPTY} currentFilm={currentFilm} />
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
