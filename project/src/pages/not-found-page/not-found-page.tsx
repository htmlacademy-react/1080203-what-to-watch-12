import { Link } from 'react-router-dom';
import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className='not-found-page-container'>
      <h1>404 Page not found</h1>
      <Link to="/">На главную</Link>
    </div>
  );
}

export default NotFoundPage;
