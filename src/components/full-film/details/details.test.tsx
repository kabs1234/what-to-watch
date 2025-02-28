import { render, screen } from '@testing-library/react';
import { filmMock } from '../../../mocks/stub';
import FullFilmDetails from './details';

jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual<typeof import('dayjs')>('dayjs');
  return {
    ...originalDayjs,
    extend: jest.fn(),
    duration: (time: number, unit: string) => ({
      asMinutes: () => time,
      format: (formatStr: string) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      },
    }),
  };
});

describe('Component: FullFilmDetails', () => {
  it('should render correctly', () => {
    const fakeFilm = filmMock;

    render(<FullFilmDetails film={fakeFilm} />);

    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.director)).toBeInTheDocument();

    expect(screen.getByText('Starring')).toBeInTheDocument();

    expect(screen.getByText('Run Time')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.director)).toBeInTheDocument();

    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();

    expect(screen.getByText('Released')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();
  });
});
