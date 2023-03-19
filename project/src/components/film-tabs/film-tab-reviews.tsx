import { Film } from '../../types/film-type';
import { mockReviews } from '../../mocks/reviews';
import FilmReview from './film-review';
import { FilmReviewsType } from '../../types/film-reviews-type';
import { isOdd } from '../../utils';

function FilmTabReviews({ currentFilm }: { currentFilm: Film | undefined}): JSX.Element {
  const evenReviews: FilmReviewsType = [];
  const oddReviews: FilmReviewsType = [];

  mockReviews.forEach((review, i) => {
    isOdd(i + 1) ? oddReviews.push(review) : evenReviews.push(review);
  });

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {evenReviews.map((review) => <FilmReview review={review} key={review.id} />)}
      </div>
      <div className="film-card__reviews-col">
        {oddReviews.map((review) => <FilmReview review={review} key={review.id} />)}
      </div>
    </div>
  );
}

export default FilmTabReviews;
