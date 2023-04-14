import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { FilmNewReview } from '../../types/film-new-review-type';
import { FILM_RATING, NOT_VALID_RATING, REVIEW_LENGTH, SYMBOLS } from '../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { sendReviewAction } from '../../store/api-actions';

function AddReview(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const startState: FilmNewReview = { id, rating: NOT_VALID_RATING, comment: SYMBOLS.EMPTY };
  const [reviewState, setReviewState] = useState(startState);

  const isSubmitDisabled = () => {
    const isRatingValid = reviewState.rating === NOT_VALID_RATING;
    const isReviewValid = reviewState.comment.length < REVIEW_LENGTH.MIN || reviewState.comment.length > REVIEW_LENGTH.MAX;

    return isRatingValid || isReviewValid;
  };

  const changeRatingHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setReviewState({
      id,
      rating: e.target.value,
      comment: reviewState.comment
    });
  };

  const changeReviewHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setReviewState({
      id,
      rating: reviewState.rating,
      comment: e.target.value
    });
  };

  const sendReviewHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    dispatch(sendReviewAction(reviewState));
  };

  return (
    <div className="add-review">
      <form className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {FILM_RATING.map((rating) => (
              <React.Fragment key={rating}>
                <input
                  className="rating__input"
                  id={`star-${rating}`}
                  type="radio"
                  name="rating"
                  value={rating}
                  onChange={changeRatingHandler}
                />
                <label
                  className="rating__label"
                  htmlFor={`star-${rating}`}
                >
                  Rating {rating}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={changeReviewHandler}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isSubmitDisabled()}
              onClick={sendReviewHandler}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
