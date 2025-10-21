import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const h = screen.getByText(/Unique To-Do List/i);
  expect(h).toBeInTheDocument();
});
