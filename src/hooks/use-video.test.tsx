import { render, renderHook, screen } from '@testing-library/react';
import useVideo from './use-video';

const DummyComponent = () => <video data-testid='dummy'></video>;

describe('Hook: UseVideo', () => {
  it('should return object with settings of the video', () => {
    render(<DummyComponent />);

    const video: HTMLVideoElement = screen.getByTestId('dummy');
    const videoLink =
      'https://10.react.htmlacademy.pro/static/film/video/bubbles.mp4';

    const { result } = renderHook(() =>
      useVideo({ current: video }, videoLink)
    );

    const hookResult = result.current;

    expect(hookResult.activeControl).toBe('play');
    expect(hookResult.currentTime).toBe(0);
    expect(hookResult.videoDuration).toBe(null);
    expect(hookResult.videoProgress).toBe(0);
  });
});
