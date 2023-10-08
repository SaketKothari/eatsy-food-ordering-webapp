import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MOCK_DATA from '../../utils/resCardMock.json';
import RestaurantCard, { withIsOpenLabel } from '../RestaurantCard';

it('Should render RestaurantCard component with props data', () => {
  render(<RestaurantCard resData={MOCK_DATA} />);

  const name = screen.getByText('KFC');
  expect(name).toBeInTheDocument();
});

const DummyComponent = () => <div>Original Component</div>;
// Wrap the DummyComponent with the HOC
const ComponentWithHOC = withIsOpenLabel(DummyComponent);

it('Should renders the HOC label on top of the original component', () => {
  render(<ComponentWithHOC />);

  // Check if the label rendered by the HOC is present
  const label = screen.getByText('Open');
  expect(label).toBeInTheDocument();

  // Check if the original component content is also present
  const originalContent = screen.getByText('Original Component');
  expect(originalContent).toBeInTheDocument();
});
