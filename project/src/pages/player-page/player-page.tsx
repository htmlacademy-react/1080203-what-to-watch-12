import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCurrentFilms } from '../../store/processes/films-process/films-selectors';
import { convertSecondsToTime, getFilmById } from '../../utils';
import { PlayPauseButtonIcons } from '../../const';

function PlayerPage(): JSX.Element {
  const { id } = useParams();
  const currentFilms = useAppSelector(getCurrentFilms);
  const currentFilm = getFilmById({ filmId: id, films: currentFilms });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const togglerRef = useRef<HTMLDivElement | null>(null);
  const [currentButtonIcon, setCurrentButtonIcon] = useState(PlayPauseButtonIcons.Pause);
  const [countDown, setCountDown] = useState<number | null>(null);
  const navigate = useNavigate();

  const playPauseButtonClickHandler = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play();
      setCurrentButtonIcon(PlayPauseButtonIcons.Pause);
    } else {
      videoRef.current.pause();
      setCurrentButtonIcon(PlayPauseButtonIcons.Play);
    }
  };

  const fullscreenButtonClickHandler = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const updateCurrentTimeHandler = () => {
    if (!videoRef.current || !progressRef.current || !togglerRef.current) {
      return;
    }

    const leftTime = Math.round(videoRef.current.duration - videoRef.current.currentTime);
    const leftTimeInPercents = 100 - Math.trunc((leftTime / videoRef.current.duration) * 100);

    progressRef.current.value = leftTimeInPercents;
    togglerRef.current.style.left = `${leftTimeInPercents}%`;

    if (!countDown || leftTime < countDown) {
      setCountDown(leftTime);
    }

    if (!leftTime) {
      setCurrentButtonIcon(PlayPauseButtonIcons.Play);
    }
  };

  const playerExitButtonClickHandler = () => navigate(-1);

  return (
    <div className="player">
      <video
        src={currentFilm?.videoLink}
        className="player__video"
        poster={currentFilm?.backgroundImage}
        autoPlay
        ref={videoRef}
        onTimeUpdate={updateCurrentTimeHandler}
      >
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={playerExitButtonClickHandler}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">

            <progress
              className="player__progress"
              value="0" max="100"
              ref={progressRef}
            >
            </progress>

            <div
              className="player__toggler"
              style={{left: '0%'}}
              ref={togglerRef}
            >
              Toggler
            </div>

          </div>
          <div className="player__time-value">{convertSecondsToTime(countDown)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={playPauseButtonClickHandler}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={currentButtonIcon}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={fullscreenButtonClickHandler}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
