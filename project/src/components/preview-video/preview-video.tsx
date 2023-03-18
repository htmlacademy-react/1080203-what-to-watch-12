import { useRef } from 'react';
import { PREVIEW_VIDEO_DELAY } from '../../const';
import { PreviewVideoProps } from '../../types/preview-video-props-type';

function PreviewVideo({ posterSrc, previewSrc }: PreviewVideoProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playVideo = () => {
    if (videoRef.current !== null) {
      setTimeout(() => {
        if (videoRef.current !== null) {
          videoRef.current.play();
        }
      }, PREVIEW_VIDEO_DELAY);
    }
  };

  const stopVideo = () => {
    if (videoRef.current !== null) {
      videoRef.current.load();
    }
  };

  return (
    <video
      width="280"
      height="175"
      poster={posterSrc}
      muted
      loop
      ref={videoRef}
      onMouseEnter={playVideo}
      onMouseLeave={stopVideo}
    >
      <source src={previewSrc} type="video/mp4" />
    </video>
  );
}

export default PreviewVideo;
