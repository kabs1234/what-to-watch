import { render, screen } from '@testing-library/react';
import PlayerControls from './player-controls';
import userEvent from '@testing-library/user-event';

describe('Component: PlayerControls', () => {
  it('should render correctly', () => {
    render(
      <PlayerControls
        currentTime={10}
        videoDuration={15}
        videoProgress={0}
        activeControl='play'
      />
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Transpotting')).toBeInTheDocument();
    expect(screen.getByText('-00:05')).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();
  });

  it('should call control function on control click', async () => {
    const mockControlButtonFunction = jest.fn();

    render(
      <PlayerControls
        currentTime={10}
        videoDuration={15}
        videoProgress={0}
        activeControl='pause'
        onControlButtonClick={mockControlButtonFunction}
      />
    );

    const controlButton = screen.getByText('Pause');

    expect(controlButton).toBeInTheDocument();
    await userEvent.click(controlButton);

    expect(mockControlButtonFunction).toHaveBeenCalledTimes(1);
  });
  it('should call full screen function on fullscreen button click', async () => {
    const mockFunction = jest.fn();

    render(
      <PlayerControls
        currentTime={10}
        videoDuration={15}
        videoProgress={0}
        activeControl='pause'
        onFullScreenButtonClick={mockFunction}
      />
    );

    const fullScreenButton = screen.getByText('Full screen');

    expect(fullScreenButton).toBeInTheDocument();
    await userEvent.click(fullScreenButton);

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
