import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';
import GenresList from '../../components/genres-list/genres-list';
import { Film } from '../../types/film-type';
import { useAppSelector } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeGenre } from '../../store/actions';
import { capitalizeFirstLetter } from '../../utils';
import { SYMBOLS } from '../../const';

function MainPage({ promo }: { promo: Film }): JSX.Element {
  const dispatch = useAppDispatch();
  const filteredFilms = useAppSelector((state) => state.films);
  const currentGenre = useAppSelector((state) => state.genre);
  const location = useLocation();

  const getGenreByHash = (hash: string): string => capitalizeFirstLetter(hash.replace(SYMBOLS.HASH, SYMBOLS.EMPTY));

  if (location.hash && getGenreByHash(location.hash) !== currentGenre) {
    dispatch(changeGenre({ genre: getGenreByHash(location.hash) }));
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promo.backgroundImage} alt={promo.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promo.posterImage} alt={`${promo.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promo.genre}</span>
                <span className="film-card__year">{promo.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton id={promo.id.toString()} />

                <MyListButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <FilmsList films={filteredFilms} isMoreLikeThis={false} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MainPage;
