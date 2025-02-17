import { render, queryByAttribute } from '@testing-library/react';
import Sprites from './sprites';

const getById = queryByAttribute.bind(null, 'id');

describe('Component: Sprites', () => {
  it('should render correctly', () => {
    const { container } = render(<Sprites />);

    const addIcon = getById(container, 'add');
    const fullScreenIcon = getById(container, 'full-screen');
    const inListIcon = getById(container, 'in-list');
    const pauseIcon = getById(container, 'pause');
    const playIcon = getById(container, 'play-s');

    expect(addIcon).toBeInTheDocument();
    expect(fullScreenIcon).toBeInTheDocument();
    expect(inListIcon).toBeInTheDocument();
    expect(pauseIcon).toBeInTheDocument();
    expect(playIcon).toBeInTheDocument();
  });
});
