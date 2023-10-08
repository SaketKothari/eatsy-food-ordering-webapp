import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import Cart from '../Cart';
import Header from '../Header';
import RestaurantMenu from '../RestaurantMenu';
import appStore from '../../store/appStore';
import MOCK_MENUDATA from '../../utils/resMenu.json';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_MENUDATA),
  })
);

// Define common setup for rendering components
const renderComponents = async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });
};

describe('Restaurant Menu Tests', () => {
  beforeAll(() => {
    // Set up any common actions or data loading here if needed
  });

  beforeEach(() => {
    // Reset any state or perform actions before each test case if needed
  });

  it('should display food items after clicking accordion header', async () => {
    await renderComponents();

    const accordionHeader = screen.getByText('DOUBLE DOWN (5)');
    fireEvent.click(accordionHeader);

    expect(screen.getAllByTestId('foodItems').length).toBe(5);
  });

  it('should add an item to the cart', async () => {
    await renderComponents();

    const accordionHeader = screen.getByText('DOUBLE DOWN (5)');
    fireEvent.click(accordionHeader);

    const addBtns = screen.getAllByRole('button', { name: 'Add' });
    fireEvent.click(addBtns[0]);

    expect(screen.getAllByTestId('foodItems').length).toBe(6);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should clear the cart and display an empty cart message', async () => {
    await renderComponents();

    const accordionHeader = screen.getByText('DOUBLE DOWN (5)');
    fireEvent.click(accordionHeader);

    const addBtns = screen.getAllByRole('button', { name: 'Add' });
    fireEvent.click(addBtns[0]);

    fireEvent.click(screen.getByRole('button', { name: 'Clear Cart' }));

    expect(screen.getAllByTestId('foodItems').length).toBe(5);
    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });
});
