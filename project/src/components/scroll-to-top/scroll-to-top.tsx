import { useEffect } from 'react';
import { useLocation } from 'react-router';

// todo Изучить документацию роутера https://v5.reactrouter.com/web/guides/scroll-restoration

function ScrollToTop({ children }: { children: React.ReactNode }): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <div>{children}</div>;
}

export default ScrollToTop;

