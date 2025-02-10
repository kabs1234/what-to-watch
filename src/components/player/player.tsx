import { useNavigate, useParams } from 'react-router-dom';
import Sprites from '../sprites/sprites';
import { useCallback, useEffect, useRef, useState } from 'react';
import Spinner from '../spinner/spinner';
import useVideo from '../../hooks/use-video';
import { useAppDispatch } from '../../hooks';
import { fetchFilmAction } from '../../store/thunks';
import { unwrapResult } from '@reduxjs/toolkit';
import PlayerControls from '../player-controls/player-controls';
import PlayerEmpty from '../player-empty/player-empty';

export default function Player(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [isVideoFetchFailed, setIsVideoFetchFailed] = useState<boolean>(false);

  const videoProgressWidth =
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) - 130;

  const fetchFilm = useCallback(async (): Promise<void> => {
    try {
      const fetchedFilm = await dispatch(fetchFilmAction(Number(id)));
      const filmData = unwrapResult(fetchedFilm);

      setVideoLink(filmData.videoLink);
    } catch (err) {
      setIsVideoFetchFailed(true);
    }
  }, [dispatch, id]);

  const handleControlButtonClick = (): void => {
    const videoPlayer = videoRef.current;

    if (videoPlayer) {
      if (activeControl === 'play') {
        videoPlayer.play();
        setActiveControl('pause');
        return;
      }

      setActiveControl('play');
      videoPlayer.pause();
    }
  };

  const handleExitButtonClick = (): void => {
    navigate(-1);
  };

  const {
    activeControl,
    currentTime,
    videoDuration,
    videoProgress,
    setActiveControl,
  } = useVideo(videoRef, videoLink);

  useEffect(() => {
    fetchFilm();
  }, [fetchFilm]);

  if (isVideoFetchFailed) {
    return <PlayerEmpty />;
  }

  if (!videoLink) {
    return <Spinner />;
  }

  return (
    <>
      <Sprites />
      <div className='player'>
        <video src={videoLink} className='player__video' ref={videoRef} />
        <button
          type='button'
          className='player__exit'
          onClick={handleExitButtonClick}
        >
          Exit
        </button>
        <PlayerControls
          activeControl={activeControl}
          onControlButtonClick={handleControlButtonClick}
          currentTime={currentTime}
          videoDuration={videoDuration}
          videoProgress={videoProgress}
          videoProgressWidth={videoProgressWidth}
        />
      </div>
    </>
  );
}
