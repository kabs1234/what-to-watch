import { useNavigate, useParams } from 'react-router-dom';
import Sprites from '../../components/sprites/sprites';
import { useCallback, useEffect, useRef, useState } from 'react';
import Spinner from '../../components/spinner/spinner';
import useVideo from '../../hooks/use-video';
import { useAppDispatch } from '../../hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import PlayerControls from '../../components/player-controls/player-controls';
import PlayerEmpty from '../../components/player-empty/player-empty';
import { fetchFilmAction } from '../../store/film/film-thunks';

export default function Player(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [isVideoFetchFailed, setIsVideoFetchFailed] = useState<boolean>(false);

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
      if (videoPlayer.paused) {
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
    }
  };

  const handleExitButtonClick = (): void => {
    navigate(-1);
  };

  const handleFullScreenButtonClick = (): void => {
    const videoPlayer = videoRef.current;

    videoPlayer?.requestFullscreen();
  };

  const { activeControl, currentTime, videoDuration, videoProgress } = useVideo(
    videoRef,
    videoLink
  );

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
        <video
          src={videoLink}
          className='player__video'
          ref={videoRef}
          data-testid='video'
        />
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
          onFullScreenButtonClick={handleFullScreenButtonClick}
          currentTime={currentTime}
          videoDuration={videoDuration}
          videoProgress={videoProgress}
        />
      </div>
    </>
  );
}
