import { FILM_RATINGS } from '../../const';
import React from 'react';
import { AddReviewStarsProps } from '../../types/add-review-stars-props';

function AddReviewStars({ changeRatingHandler, isCommentSending }: AddReviewStarsProps): JSX.Element {
  return (
    <div className="rating__stars">
      {FILM_RATINGS.map((rating) => (
        <React.Fragment key={rating}>
          <input
            className="rating__input"
            id={`star-${rating}`}
            type="radio"
            name="rating"
            value={rating}
            onChange={changeRatingHandler}
            disabled={isCommentSending}
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
  );
}

export default AddReviewStars;
