import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/selectors';
import Loading from '../loading/loading';
import NotFound from '../../pages/not-found/not-found';
import Sprites from '../sprites/sprites';
import { useEffect, useRef, useState } from 'react';
import { getDisplayTime } from '../../utils/general';

export default function Player(): JSX.Element {
  const { id } = useParams();
  const allfilms = useAppSelector(getFilms);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeControl, setActiveControl] = useState<'play' | 'pause'>('play');
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoPlayer = videoRef.current;

    const handleLoadedMetadata = () => {
      if (videoPlayer) {
        setVideoDuration(videoPlayer.duration);
      }
    };

    const handleTimeUpdate = () => {
      if (videoPlayer) {
        setCurrentTime(videoPlayer.currentTime);
      }
    };

    videoPlayer?.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoPlayer?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoPlayer?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoPlayer?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  if (!allfilms) {
    return <Loading />;
  }

  const film = allfilms.find((element) => element.id === Number(id));

  if (!film) {
    return <NotFound />;
  }

  const controlPlayer = () => {
    const videoPlayer = videoRef.current;
    if (activeControl === 'play') {
      videoPlayer?.play();
      setActiveControl('pause');
      setIsPlaying(true); // Set isPlaying to true when video starts playing
      return;
    }

    setActiveControl('play');
    videoPlayer?.pause();
    setIsPlaying(false); // Set isPlaying to false when video is paused
  };

  return (
    <>
      <Sprites />
      <div className='player'>
        <video
          src={film.videoLink}
          className='player__video'
          ref={videoRef}
          autoPlay
        />
        <button type='button' className='player__exit'>
          Exit
        </button>
        <div className='player__controls'>
          <div className='player__controls-row'>
            <div className='player__time'>
              <progress className='player__progress' value={30} max={100} />
              <div className='player__toggler' style={{ left: '30%' }}>
                Toggler
              </div>
            </div>
            <div className='player__time-value'>
              {getDisplayTime(videoDuration, currentTime, isPlaying)}
            </div>
          </div>
          <div className='player__controls-row'>
            <button
              type='button'
              className='player__play'
              onClick={controlPlayer}
            >
              <svg viewBox='0 0 19 19' width={19} height={19}>
                <use
                  xlinkHref={activeControl === 'play' ? '#play-s' : '#pause'}
                />
              </svg>
              <span>{activeControl === 'play' ? 'Play' : 'Pause'}</span>
            </button>
            <div className='player__name'>Transpotting</div>
            <button type='button' className='player__full-screen'>
              <svg viewBox='0 0 27 27' width={27} height={27}>
                <use xlinkHref='#full-screen' />
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
