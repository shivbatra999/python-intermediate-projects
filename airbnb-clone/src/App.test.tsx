import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders airbnb clone app', () => {
  render(<App />);
  const logoElement = screen.getByText(/airbnb/i);
  expect(logoElement).toBeInTheDocument();
});
