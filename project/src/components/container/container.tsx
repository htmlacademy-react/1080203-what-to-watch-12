import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch } from '../../hooks';
import { resetFilmsCount } from '../../store/processes/films-process/films-process';
import { removeLastSlash } from '../../utils';
import { Symbols } from '../../const';

function Container({ children }: { children: React.ReactNode }): JSX.Element {
  // scroll to top
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // reset films count
  const dispatch = useAppDispatch();
  const [currentPath, setCurrentPath] = useState<string>();
  const [resetStatus, setResetStatus] = useState<boolean>(false);
  const pathname = removeLastSlash(useLocation().pathname);

  if (!currentPath && currentPath !== Symbols.Empty) {
    setCurrentPath(removeLastSlash(pathname));
  }

  if (currentPath !== pathname) {
    setCurrentPath(pathname);
    setResetStatus(true);
  }

  useEffect(() => {
    dispatch(resetFilmsCount(resetStatus));
    setResetStatus(false);
  }, [dispatch, resetStatus]);

  return <div>{children}</div>;
}

export default Container;

