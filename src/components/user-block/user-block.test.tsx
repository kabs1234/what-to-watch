import { screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../const';
import { renderWithProviders } from '../../utils/test-utils';
import UserBlock from './user-block';
import { userMock } from '../../mocks/stub';

jest.mock('../header-logged/header-logged', () => {
  const mockComponent = (): JSX.Element => <div>Mocked HeaderLogged</div>;

  return mockComponent;
});

jest.mock('../header-not-logged/header-not-logged', () => {
  const mockComponent = (): JSX.Element => <div>Mocked HeaderNotLogged</div>;

  return mockComponent;
});

describe('Component: UserBlock', () => {
  it('should render HeaderLogged if authorized', () => {
    const fakeUser = userMock;

    renderWithProviders(<UserBlock />, {
      preloadedState: {
        User: {
          authorizationStatus: AuthorizationStatus.Authorized,
          user: fakeUser,
        },
      },
    });

    expect(screen.getByText('Mocked HeaderLogged')).toBeInTheDocument();
  });

  it('should render HeaderNotLogged if not authorized', () => {
    renderWithProviders(<UserBlock />, {
      preloadedState: {
        User: {
          authorizationStatus: AuthorizationStatus.NotAuthorized,
          user: null,
        },
      },
    });

    expect(screen.getByText('Mocked HeaderNotLogged')).toBeInTheDocument();
  });
});
