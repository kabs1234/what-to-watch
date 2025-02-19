import { render, screen } from '@testing-library/react';
import Rating from './rating';
import { MAX_COMMENT_RATING } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: Rating', () => {
  it('should render correctly', () => {
    const fakeActiveRating = 10;
    const onStarClick = jest.fn();

    render(
      <Rating activeRating={fakeActiveRating} onStarClick={onStarClick} />
    );

    expect(screen.getAllByRole('radio')).toHaveLength(MAX_COMMENT_RATING);
  });

  it('should call function one time on rating star click', async () => {
    const fakeActiveRating = 5;
    const onStarClick = jest.fn();

    render(
      <Rating activeRating={fakeActiveRating} onStarClick={onStarClick} />
    );

    const firstRatingStar = screen.getAllByRole('radio')[0];

    await userEvent.click(firstRatingStar);

    expect(onStarClick).toHaveBeenCalledTimes(1);
    expect(onStarClick).toHaveBeenCalledWith(10);
  });
});
