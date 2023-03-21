import { useRef, useState } from 'react';
import { PREVIEW_VIDEO_DELAY } from '../../const';
import { PreviewVideoProps } from '../../types/preview-video-props-type';

function PreviewVideo({ posterSrc, previewSrc }: PreviewVideoProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [timeId, setTimeId] = useState<ReturnType<typeof setTimeout>>();
  let timeout: ReturnType<typeof setTimeout>;

  const playVideo = () => {
    timeout = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, PREVIEW_VIDEO_DELAY);

    setTimeId(timeout);
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.load();

      if (timeId) {
        clearTimeout(timeId);
      }
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
