import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Contact from '../Contact';
import UserContext from '../../context/UserContext';

describe('Contact Page test cases', () => {
  test('Should load contact us page', () => {
    render(<Contact />);

    const pageTitle = screen.getByText('Get in touch');
    expect(pageTitle).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    expect(submitButton).toBeInTheDocument();

    // Querying
    const inputBoxes = screen.getAllByRole('textbox');
    expect(inputBoxes.length).toBe(6);
  });
});

it('Should load Contact component with a login button', () => {
  // Mock the UserContext values
  const contextValues = {
    loggedInUser: '', // Set the initial state to an empty string
    setUserName: () => {},
  };

  render(
    <UserContext.Provider value={contextValues}>
      <Contact />
    </UserContext.Provider>
  );

  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeInTheDocument();
});

it('Should change login button to logout button on click', () => {
  const contextValues = {
    loggedInUser: '', // Set the initial state to an empty string
    setUserName: () => {},
  };

  render(
    <UserContext.Provider value={contextValues}>
      <Contact />
    </UserContext.Provider>
  );

  const loginButton = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole('button', { name: 'Logout' });
  expect(logoutButton).toBeInTheDocument();
});
