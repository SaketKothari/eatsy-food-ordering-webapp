import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Body from '../Body';
import MOCK_DATA from '../../utils/resListData.json';

global.fetch = jest.fn(() => {
  // mocking fetch() working
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it('Should search restaurant list for burger text input', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const cardsBeforeSearch = screen.getAllByTestId('resCard');
  expect(cardsBeforeSearch.length).toBe(20);

  const searchButton = screen.getByRole('button', { name: 'Search' });
  const searchInput = screen.getByTestId('searchInput');

  fireEvent.change(searchInput, { target: { value: 'burger' } });
  fireEvent.click(searchButton);

  const cardsAfterSearch = screen.getAllByTestId('resCard');
  expect(cardsAfterSearch.length).toBe(4);
});

it('should filter top rated restaurants', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const topRatedButton = screen.getByRole('button', {
    name: 'Top Rated Restaurants',
  });
  fireEvent.click(topRatedButton);

  const filteredCards = screen.getAllByTestId('resCard');
  expect(filteredCards.length).toBe(13);
});
