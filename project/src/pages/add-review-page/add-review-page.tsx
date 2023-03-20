import { useParams, Link, generatePath } from 'react-router-dom';
import AddReview from '../../components/add-review/add-review';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { AppRoutes } from '../../const';
import { getFilmById } from '../../utils';

function AddReviewPage(): JSX.Element {
  const { id } = useParams();
  const currentFilm = getFilmById(id);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={generatePath(AppRoutes.Film, { id: id ?? ''})} className="breadcrumbs__link">{currentFilm?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={generatePath(AppRoutes.AddReview, { id: id ?? ''})} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={currentFilm?.posterImage}
            alt={currentFilm?.name ? `${currentFilm?.name} постер` : 'Постер'}
            width="218"
            height="327"
          />
        </div>
      </div>

      <AddReview />
    </section>
  );
}

export default AddReviewPage;
