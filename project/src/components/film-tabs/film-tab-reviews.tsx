import { Film } from '../../types/films-type';
import FilmReview from './film-review';
import { FilmReviewsType } from '../../types/film-reviews-type';
import { isOdd } from '../../utils';
import Loading from '../loading/loading';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFilmCommentsdAction } from '../../store/api-actions';
import { resetIsCommentsLoading } from '../../store/processes/comments-process/comments-process';
import { getComments, getIsCommentsLoading } from '../../store/processes/comments-process/comments-selectors';

function FilmTabReviews({ currentFilm }: { currentFilm: Film | null}): JSX.Element {
  const evenReviews: FilmReviewsType = [];
  const oddReviews: FilmReviewsType = [];
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);
  const isCommentsLoading = useAppSelector(getIsCommentsLoading);

  useEffect(() => {
    dispatch(resetIsCommentsLoading());

    if (currentFilm) {
      dispatch(getFilmCommentsdAction(currentFilm.id.toString()));
    }
  }, [currentFilm, dispatch]);

  if (isCommentsLoading) {
    return <Loading />;
  }

  comments?.forEach((review, i) => {
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
