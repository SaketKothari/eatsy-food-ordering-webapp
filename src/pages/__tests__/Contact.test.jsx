import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../Contact';

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
