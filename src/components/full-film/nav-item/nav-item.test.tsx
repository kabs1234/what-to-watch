import { render, screen } from '@testing-library/react';
import FullFilmNavItem from './nav-item';
import { FullFilmNav } from '../../../const';
import userEvent from '@testing-library/user-event';

const onNavButtonClick = jest.fn();
describe('Component: NavItem', () => {
  it('should render correctly', () => {
    const navType = FullFilmNav.Details;

    render(
      <FullFilmNavItem
        activeNav={FullFilmNav.Details}
        navType={navType}
        onNavButtonClick={onNavButtonClick}
      />
    );

    expect(screen.getByText(navType)).toBeInTheDocument();
  });

  it('should call handler function on navigation click', async () => {
    const navType = FullFilmNav.Overview;

    render(
      <FullFilmNavItem
        activeNav={FullFilmNav.Details}
        navType={navType}
        onNavButtonClick={onNavButtonClick}
      />
    );

    const navButton = screen.getByText(navType);

    await userEvent.click(navButton);

    expect(onNavButtonClick).toHaveBeenCalledTimes(1);
    expect(onNavButtonClick).toHaveBeenCalledWith(navType);
  });

  it('should hang active class when navigation type matches', () => {
    const navType = FullFilmNav.Overview;

    render(
      <FullFilmNavItem
        activeNav={FullFilmNav.Overview}
        navType={navType}
        onNavButtonClick={onNavButtonClick}
      />
    );

    const listItem = screen.getByRole('listitem');

    expect(listItem).toHaveClass('film-nav__item');
    expect(listItem).toHaveClass('film-nav__item--active');
  });

  it('should not apply active class when navigation type mismatches', () => {
    const navType = FullFilmNav.Details;

    render(
      <FullFilmNavItem
        activeNav={FullFilmNav.Overview}
        navType={navType}
        onNavButtonClick={onNavButtonClick}
      />
    );

    const listItem = screen.getByRole('listitem');

    expect(listItem).toHaveClass('film-nav__item');
    expect(listItem).not.toHaveClass('film-nav__item--active');
  });
});
