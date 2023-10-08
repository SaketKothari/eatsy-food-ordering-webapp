import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import appStore from '../../store/appStore';
import Header from '../Header';

it('Should load Header component with cart items', () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // We can pass regex also
  const cartItems = screen.getByText(/Cart/);
  expect(cartItems).toBeInTheDocument();
});
