import { ChangeEvent } from 'react';

export type AddReviewStarsProps = {
  changeRatingHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  isCommentSending: boolean;
};
