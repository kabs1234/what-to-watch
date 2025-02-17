import { render, screen } from '@testing-library/react';
import FullFilmReview from './review';
import { commentMock } from '../../../mocks/stub';

describe('Component: FullFilmReview', () => {
  it('should render correctly', () => {
    const fakeComment = commentMock;

    render(<FullFilmReview comment={fakeComment} />);

    const commentDate = screen.getByText('December 23, 2024');

    expect(
      screen.getByText(
        (_, element) => element?.textContent === fakeComment.comment
      )
    ).toBeInTheDocument();
    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
    expect(commentDate).toBeInTheDocument();
    expect(commentDate).toHaveAttribute('dateTime', '2024-12-23');
    expect(screen.getByText(fakeComment.rating)).toBeInTheDocument();
  });
});
