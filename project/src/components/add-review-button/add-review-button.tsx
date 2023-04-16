import { generatePath, Link } from 'react-router-dom';
import { AppRoutes, AuthStatus, Symbols } from '../../const';
import { useAppSelector } from '../../hooks';

function AddReviewButton({ id }: { id: string | undefined }): JSX.Element | null {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus !== AuthStatus.Auth) {
    return null;
  }

  return (
    <Link to={generatePath(AppRoutes.AddReview, { id: id ?? Symbols.Empty})} className="btn film-card__button">Add review</Link>
  );
}

export default AddReviewButton;
