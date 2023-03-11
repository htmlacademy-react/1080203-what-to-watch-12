import { ChangeEvent, useState } from 'react';

type FilmReview = {
  rating: string;
  review: string;
};

function AddReview(): JSX.Element {
  const startState: FilmReview = { rating: '0', review: '' };
  const [reviewState = startState, setReviewState] = useState<FilmReview>();

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
            <input
              className="rating__input"
              id="star-10"
              type="radio"
              name="rating"
              value="10"
              onChange={(e) => changeRatingHandler(e)}
            />
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input
              className="rating__input"
              id="star-9"
              type="radio"
              name="rating"
              value="9"
              onChange={(e) => changeRatingHandler(e)}
            />
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input className="rating__input" id="star-8" type="radio" name="rating" value="8" onChange={(e) => changeRatingHandler(e)} />
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input className="rating__input" id="star-7" type="radio" name="rating" value="7" onChange={(e) => changeRatingHandler(e)} />
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input className="rating__input" id="star-6" type="radio" name="rating" value="6" onChange={(e) => changeRatingHandler(e)} />
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={(e) => changeRatingHandler(e)} />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={(e) => changeRatingHandler(e)} />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={(e) => changeRatingHandler(e)} />
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={(e) => changeRatingHandler(e)} />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={(e) => changeRatingHandler(e)} />
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={(e) => changeReviewHandler(e)}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
