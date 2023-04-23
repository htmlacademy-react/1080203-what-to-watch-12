import { generatePath, Link } from 'react-router-dom';
import { AppRoutes, AuthStatuses, Symbols } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/processes/user-process/user-selectors';

function AddReviewButton({ id }: { id: string | undefined }): JSX.Element | null {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus !== AuthStatuses.Auth) {
    return null;
  }

  return (
    <Link to={generatePath(AppRoutes.AddReview, { id: id ?? Symbols.Empty})} className="btn film-card__button">Add review</Link>
  );
}

export default AddReviewButton;
