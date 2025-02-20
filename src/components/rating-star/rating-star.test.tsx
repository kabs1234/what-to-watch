import { render, screen } from '@testing-library/react';
import RatingStar from './rating-star';

describe('Component: RatingStar', () => {
  it('should render correctly', () => {
    const fakeActiveRating = 10;
    const fakeRatingIndex = 5;
    const onStarClick = jest.fn();

    render(
      <RatingStar
        activeRating={fakeActiveRating}
        onStarClick={onStarClick}
        ratingIndex={fakeRatingIndex}
      />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
