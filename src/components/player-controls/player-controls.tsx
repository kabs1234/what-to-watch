import { getDisplayTime } from '../../utils/general';

type PlayerControlsProps = {
  videoProgress: number;
  videoDuration: number | null;
  currentTime: number;
  activeControl?: 'play' | 'pause';
  onFullScreenButtonClick?: () => void;
  onControlButtonClick?: () => void;
};

export default function PlayerControls({
  videoProgress,
  videoDuration,
  currentTime,
  activeControl = 'play',
  onFullScreenButtonClick,
  onControlButtonClick,
}: PlayerControlsProps): JSX.Element {
  const videoProgressWidth =
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) - 130;

  return (
    <div className='player__controls'>
      <div className='player__controls-row'>
        <div className='player__time'>
          <progress
            className='player__progress'
            value={videoProgress}
            max={100}
          />
          <div
            className='player__toggler'
            style={{
              left: videoProgress * (videoProgressWidth / 100),
            }}
          >
            Toggler
          </div>
        </div>
        <div className='player__time-value'>
          {getDisplayTime(videoDuration, currentTime)}
        </div>
      </div>
      <div className='player__controls-row'>
        <button
          type='button'
          className='player__play'
          onClick={onControlButtonClick}
        >
          <svg viewBox='0 0 19 19' width={19} height={19}>
            <use xlinkHref={activeControl === 'play' ? '#play-s' : '#pause'} />
          </svg>
          <span>{activeControl === 'play' ? 'Play' : 'Pause'}</span>
        </button>
        <div className='player__name'>Transpotting</div>
        <button
          type='button'
          className='player__full-screen'
          onClick={onFullScreenButtonClick}
        >
          <svg viewBox='0 0 27 27' width={27} height={27}>
            <use xlinkHref='#full-screen' />
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  );
}
