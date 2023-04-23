import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';
import GenresList from '../../components/genres-list/genres-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useAppSelector } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeGenre } from '../../store/processes/films-process/films-process';
import { capitalizeFirstLetter } from '../../utils';
import { Symbols } from '../../const';
import Loading from '../../components/loading/loading';
import { getFilteredFilms, getCurrentGenre, getPromoFilm } from '../../store/processes/films-process/films-selectors';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const filteredFilms = useAppSelector(getFilteredFilms);
  const currentGenre = useAppSelector(getCurrentGenre);
  const location = useLocation();

  const getGenreByHash = (hash: string): string => capitalizeFirstLetter(hash.replace(Symbols.Hash, Symbols.Empty));

  if (location.hash && getGenreByHash(location.hash) !== currentGenre) {
    dispatch(changeGenre(getGenreByHash(location.hash)));
  }

  if (!promoFilm) {
    return <Loading />;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton id={promoFilm.id.toString()} />

                <MyListButton filmId={promoFilm.id.toString()} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <FilmsList films={filteredFilms} />

          <ShowMoreButton />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MainPage;
