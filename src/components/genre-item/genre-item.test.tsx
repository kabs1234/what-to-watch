import { render, screen } from '@testing-library/react';
import GenreItem from './genre-item';
import userEvent from '@testing-library/user-event';

describe('Component: GenreItem', () => {
  it('should render correctly', () => {
    const fakeActiveGenre = 'Comedy';
    const fakeGenre = 'Comedy';
    const fakeHandler = jest.fn((genre: string) => undefined);

    render(
      <GenreItem
        activeGenre={fakeActiveGenre}
        genre={fakeGenre}
        onClick={fakeHandler}
      />
    );

    expect(screen.getByText(fakeGenre)).toBeInTheDocument();
  });

  it('should not have active class if active genre mismatches item genre', () => {
    const fakeActiveGenre = 'Comedy';
    const fakeGenre = 'Action';
    const fakeHandler = jest.fn((genre: string) => undefined);

    const { container } = render(
      <GenreItem
        activeGenre={fakeActiveGenre}
        genre={fakeGenre}
        onClick={fakeHandler}
      />
    );

    const { firstChild } = container;

    expect(firstChild).toHaveClass('catalog__genres-item');
    expect(firstChild).not.toHaveClass('catalog__genres-item--active');
  });

  it('should have active class if active genre matches item genre', () => {
    const fakeActiveGenre = 'Comedy';
    const fakeGenre = 'Comedy';
    const fakeHandler = jest.fn((genre: string) => undefined);

    const { container } = render(
      <GenreItem
        activeGenre={fakeActiveGenre}
        genre={fakeGenre}
        onClick={fakeHandler}
      />
    );

    const { firstChild } = container;

    expect(firstChild).toHaveClass('catalog__genres-item');
    expect(firstChild).toHaveClass('catalog__genres-item--active');
  });

  it('should call function on genre click', async () => {
    const fakeActiveGenre = 'Comedy';
    const fakeGenre = 'Comedy';
    const fakeHandler = jest.fn((genre: string) => undefined);

    render(
      <GenreItem
        activeGenre={fakeActiveGenre}
        genre={fakeGenre}
        onClick={fakeHandler}
      />
    );

    const genreButton = screen.getByText(fakeGenre);

    await userEvent.click(genreButton);

    expect(fakeHandler).toHaveBeenCalledTimes(1);
    expect(fakeHandler).toHaveBeenCalledWith(fakeGenre);
  });
});
