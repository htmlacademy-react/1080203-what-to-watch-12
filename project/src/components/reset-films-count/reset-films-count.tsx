import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch } from '../../hooks';
import { resetFilmsCount } from '../../store/actions';
import { removeLastSlash } from '../../utils';

function ResetFilmsCount(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const [currentPath, setCurrentPath] = useState<string>();
  const [resetStatus, setResetStatus] = useState<boolean>(false);
  const pathname = removeLastSlash(useLocation().pathname);

  if (currentPath === undefined) {
    setCurrentPath(removeLastSlash(pathname));
  }

  if (currentPath !== undefined && currentPath !== pathname) {
    setCurrentPath(pathname);
    setResetStatus(true);
  }

  useEffect(() => {
    dispatch(resetFilmsCount(resetStatus));
    setResetStatus(false);
  }, [dispatch, resetStatus]);

  return null;
}

export default ResetFilmsCount;
