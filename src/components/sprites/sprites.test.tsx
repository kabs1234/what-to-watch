import { render, queryByAttribute } from '@testing-library/react';
import Sprites from './sprites';

const getById = queryByAttribute.bind(null, 'id');

describe('Component: Sprites', () => {
  it('should render correctly', () => {
    const view = render(<Sprites />);

    const addIcon = getById(view.container, 'add');
    const fullScreenIcon = getById(view.container, 'full-screen');
    const inListIcon = getById(view.container, 'in-list');
    const pauseIcon = getById(view.container, 'pause');
    const playIcon = getById(view.container, 'play-s');

    expect(addIcon).toBeInTheDocument();
    expect(fullScreenIcon).toBeInTheDocument();
    expect(inListIcon).toBeInTheDocument();
    expect(pauseIcon).toBeInTheDocument();
    expect(playIcon).toBeInTheDocument();
  });
});
