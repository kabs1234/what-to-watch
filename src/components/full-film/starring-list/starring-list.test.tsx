import { render, screen } from '@testing-library/react';
import FullFilmStarringList from './starring-list';
import { filmMock } from '../../../mocks/stub';

describe('Component: FullFilmStarringList', () => {
  it('should render correctly when starring actors length is more than 2', () => {
    const fakeStarringActors = filmMock.starring;
    const lastActorIndex = fakeStarringActors.length - 1;

    render(<FullFilmStarringList starringActors={fakeStarringActors} />);

    expect(
      screen.getByText((content, _) =>
        content.startsWith(`${fakeStarringActors[0]},`)
      )
    ).toBeInTheDocument();

    fakeStarringActors.slice(1, lastActorIndex).forEach((actor) => {
      expect(
        screen.getByText((content, _) => content.includes(`${actor},`))
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText((content, _) =>
        content.endsWith(fakeStarringActors[lastActorIndex])
      )
    ).toBeInTheDocument();
  });

  it('should render correctly when starring actors length is more than 1', () => {
    const fakeStarringActors = filmMock.starring.slice(0, 2);
    const lastActorIndex = fakeStarringActors.length - 1;

    render(<FullFilmStarringList starringActors={fakeStarringActors} />);

    expect(
      screen.getByText((content, _) =>
        content.startsWith(`${fakeStarringActors[0]},`)
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, _) =>
        content.endsWith(fakeStarringActors[lastActorIndex])
      )
    ).toBeInTheDocument();
  });

  it('should render correctly when starring actors length equals 1', () => {
    const fakeStarringActors = filmMock.starring.slice(0, 1);
    const lastActorIndex = fakeStarringActors.length - 1;

    render(<FullFilmStarringList starringActors={fakeStarringActors} />);

    expect(
      screen.getByText(fakeStarringActors[lastActorIndex])
    ).toBeInTheDocument();
  });
});
