import { useState } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch } from '../../hooks';
import { resetFilmsCount } from '../../store/actions';

// todo Вынести в utils
function removeLastSlash(string: string | undefined) {
  if (string !== undefined && string.charAt(string.length - 1) === '/') { // todo Вынести слэш в константу
    string = string.slice(0, string.length - 1);
  }

  return string;
}

function ResetFilmsCount(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const [currentPath, setCurrentPath] = useState<string>();
  const pathname = removeLastSlash(useLocation().pathname);

  if (currentPath === undefined) {
    setCurrentPath(removeLastSlash(pathname));
  }

  if (currentPath !== undefined && currentPath !== pathname) {
    setCurrentPath(pathname);
    dispatch(resetFilmsCount());
  }

  return null;
}

export default ResetFilmsCount;
