import { useParams, generatePath, Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';
import { getFilmById } from '../../utils';
import FilmsList from '../../components/films-list/films-list';
import { mockFilms } from '../../mocks/films';

// todo Сделать сброс скрола

function FilmPage(): JSX.Element {
  const { id } = useParams();
  const currentFilm = getFilmById(id);

  const getLevelByRating = () => {
    let currentLevel = '';
    const rating = currentFilm?.rating === undefined ? '0' : currentFilm?.rating;

    switch (true) {
      case rating >= 0 && rating < 3:
        currentLevel = 'Bad';
        break;
      case rating >= 3 && rating < 5:
        currentLevel = 'Normal';
        break;
      case rating >= 5 && rating < 8:
        currentLevel = 'Good';
        break;
      case rating >= 8 && rating < 10:
        currentLevel = 'Very good';
        break;
      case rating === 10:
        currentLevel = 'Awesome';
        break;
    }

    return currentLevel;
  };

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
                <PlayButton id={id ?? ''} />

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
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="/#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="/#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="/#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{currentFilm?.rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">{getLevelByRating()}</span>
                  <span className="film-rating__count">{currentFilm?.scoresCount} ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>{currentFilm?.description}</p>

                <p className="film-card__director"><strong>Director: {currentFilm?.director}</strong></p>

                {/* Вопрос Нужно ли выносить в константу ', ' */}
                <p className="film-card__starring"><strong>Starring: {currentFilm?.starring.join(', ')}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={mockFilms} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default FilmPage;
