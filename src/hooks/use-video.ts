import { useEffect, useState } from 'react';

export default function useVideo(
  videoRef: React.RefObject<HTMLVideoElement>,
  videoLink: string | null
) {
  const [activeControl, setActiveControl] = useState<'play' | 'pause'>('play');
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState<number>(0);

  useEffect(() => {
    const videoPlayer = videoRef.current;

    if (!videoPlayer) {
      return;
    }

    const handleLoadStart = (): void => {
      setIsVideoLoading(true);
    };

    const handleLoadedData = (): void => {
      setIsVideoLoading(false);
    };

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

    videoPlayer?.addEventListener('loadstart', handleLoadStart);
    videoPlayer?.addEventListener('loadeddata', handleLoadedData);
    videoPlayer?.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoPlayer?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoPlayer?.removeEventListener('loadstart', handleLoadStart);
      videoPlayer?.removeEventListener('canplay', handleLoadedData);
      videoPlayer?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoPlayer?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef, videoLink]);

  return {
    activeControl,
    isVideoLoading,
    currentTime,
    videoDuration,
    videoProgress,
    setActiveControl,
  };
}
