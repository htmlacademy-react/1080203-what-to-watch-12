import React, { ChangeEvent, useState } from 'react';
import { FilmNewReview } from '../../types/film-new-review-type';
import { FILM_RATING } from '../../const';
// import { useAppDispatch } from '../../hooks';

function AddReview(): JSX.Element {
  // const dispatch = useAppDispatch();
  const startState: FilmNewReview = { rating: '0', review: '' };
  const [reviewState, setReviewState] = useState(startState);

  const isSubmitDisabled = () => {
    const isRatingValid = reviewState.rating === '0'; // todo Заменить на константу
    const isReviewValid = reviewState.review.length < 50 || reviewState.review.length > 400;

    return isRatingValid || isReviewValid;
  };

  const changeRatingHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setReviewState({
      rating: e.target.value,
      review: reviewState.review
    });
  };

  const changeReviewHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setReviewState({
      rating: reviewState.rating,
      review: e.target.value
    });
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
