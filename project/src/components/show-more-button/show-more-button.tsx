import { useAppDispatch, useAppSelector } from '../../hooks';
import { showMoreFilms } from '../../store/processes/films-process/films-process';
import { getMaxToShow } from '../../store/processes/films-process/films-selectors';
import { getFilteredFilmsLength } from '../../store/processes/films-process/films-selectors';

function ShowMoreButton(): JSX.Element | null {
  const maxToShow = useAppSelector(getMaxToShow);
  const filmsCount = useAppSelector(getFilteredFilmsLength);
  const dispatch = useAppDispatch();

  const showMoreButtonClickHandler = () => dispatch(showMoreFilms());

  const showMoreButton = (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={showMoreButtonClickHandler}
      >
        Show more
      </button>
    </div>
  );

  return maxToShow < filmsCount ? showMoreButton : null;
}

export default ShowMoreButton;
