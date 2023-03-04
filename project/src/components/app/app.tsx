import MainPage from '../../pages/main-page/main-page';

type FilmCardProps = {
  title: string;
  genre: string;
  release: number;
}

function App({ title, genre, release }: FilmCardProps): JSX.Element {
  return <MainPage title = {title} genre = {genre} release = {release} />;
}

export default App;
