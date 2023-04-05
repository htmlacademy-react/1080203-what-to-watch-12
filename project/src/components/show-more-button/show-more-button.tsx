import { useAppDispatch, useAppSelector } from '../../hooks';
import { showMoreFilms } from '../../store/actions';

function ShowMoreButton(): JSX.Element | null {
  const maxToShow = useAppSelector((state) => state.maxToShow);
  const filmsCount = useAppSelector((state) => state.filteredFilms.length);
  const dispatch = useAppDispatch();

  const showMoreButton = (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => dispatch(showMoreFilms())}
      >
        Show more
      </button>
    </div>
  );

  return maxToShow < filmsCount ? showMoreButton : null;
}

export default ShowMoreButton;
