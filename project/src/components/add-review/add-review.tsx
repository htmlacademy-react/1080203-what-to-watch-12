import { ChangeEvent, MouseEvent, useState } from 'react';
import { FilmNewReview } from '../../types/film-new-review-type';
import { NOT_VALID_RATING, ReviewLength, Symbols } from '../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';
import AddReviewStars from './add-review-stars';
import { getIsCommentSending } from '../../store/processes/comments-process/comments-selectors';

function AddReview(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const startState: FilmNewReview = { id, rating: NOT_VALID_RATING, comment: Symbols.Empty };
  const [reviewState, setReviewState] = useState(startState);
  const isCommentSending = useAppSelector(getIsCommentSending);

  const isSubmitDisabled = () => {
    const isRatingNotValid = reviewState.rating === NOT_VALID_RATING;
    const isReviewNotValid = reviewState.comment.length < ReviewLength.Min || reviewState.comment.length > ReviewLength.Max;

    return isRatingNotValid || isReviewNotValid || isCommentSending;
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

  const sendCommentHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    dispatch(sendCommentAction(reviewState));
  };

  return (
    <div className="add-review">
      <form className="add-review__form">
        <div className="rating">
          <AddReviewStars changeRatingHandler={changeRatingHandler} isCommentSending={isCommentSending} />
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={changeReviewHandler}
            disabled={isCommentSending}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isSubmitDisabled()}
              onClick={sendCommentHandler}
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
