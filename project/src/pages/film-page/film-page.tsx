import { useParams, generatePath, Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';
// import { getFilmById } from '../../utils'; todo Проверить, нужна ли функция и удалить везде
import FilmsList from '../../components/films-list/films-list';
import FilmTabs from '../../components/film-tabs/film-tabs';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Loading from '../../components/loading/loading';
import { getFilmByIdAction, getSimilarFilmsdAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { resetIsSingleFilmLoading } from '../../store/actions';

function FilmPage(): JSX.Element {
  // Запросить комментарии

  // todo Навести порядок
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
                <PlayButton id={id ?? ''} /> {/* todo Заменить на константу везде в проекте */}

                <MyListButton />

                <Link to={generatePath(AppRoutes.AddReview, { id: id ?? ''})} className="btn film-card__button">Add review</Link>
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
              <FilmTabs id={id ?? ''} currentFilm={currentFilm} />
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
