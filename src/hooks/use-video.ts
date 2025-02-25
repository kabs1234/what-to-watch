import { useEffect, useState } from 'react';

export default function useVideo(
  videoRef: React.RefObject<HTMLVideoElement>,
  videoLink: string | null
) {
  const [activeControl, setActiveControl] = useState<'play' | 'pause'>('play');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState<number>(0);

  useEffect(() => {
    const videoPlayer = videoRef.current;

    if (!videoPlayer) {
      return;
    }

    const handleLoadedMetadata = (): void => {
      if (videoPlayer) {
        setVideoDuration(videoPlayer.duration);
      }
    };

    const handleTimeUpdate = (): void => {
      if (videoPlayer) {
        setCurrentTime(videoPlayer.currentTime);

        setVideoProgress(
          Math.round((videoPlayer.currentTime * 100) / videoPlayer.duration)
        );

        if (videoPlayer.ended) {
          setActiveControl('play');
        }
      }
    };

    const handleVideoPause = (): void => {
      setActiveControl('play');
    };

    const handleVideoPlay = (): void => {
      setActiveControl('pause');
    };

    videoPlayer?.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoPlayer?.addEventListener('timeupdate', handleTimeUpdate);
    videoPlayer?.addEventListener('pause', handleVideoPause);
    videoPlayer?.addEventListener('play', handleVideoPlay);

    return () => {
      videoPlayer?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoPlayer?.removeEventListener('timeupdate', handleTimeUpdate);
      videoPlayer?.removeEventListener('pause', handleVideoPause);
      videoPlayer?.removeEventListener('play', handleVideoPlay);
    };
  }, [videoRef, videoLink]);

  return {
    activeControl,
    currentTime,
    videoDuration,
    videoProgress,
  };
}
