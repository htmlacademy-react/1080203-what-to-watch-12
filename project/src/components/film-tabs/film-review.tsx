import { FilmReviewType } from '../../types/film-reviews-type';
import dayjs from 'dayjs';
import { DateFormats } from '../../const';

function FilmReview({ review }: { review: FilmReviewType }): JSX.Element {
  const reviewDate = dayjs(review.date).format(DateFormats.ReviewDate);
  const dateTimeParam = dayjs(review.date).format(DateFormats.DateTimeParam);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={dateTimeParam}>{reviewDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default FilmReview;
