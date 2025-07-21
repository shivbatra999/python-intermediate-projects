import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  test('renders logo and search input', () => {
    render(<Header />);
    
    // Check if logo is rendered
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveTextContent('airbnb');
    
    // Check if search input is rendered
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Start your search');
    expect(searchInput).toHaveAttribute('aria-label', 'Search destinations');
  });

  test('search input has correct attributes', () => {
    render(<Header />);
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toHaveClass('flex-grow', 'pl-5', 'bg-transparent', 'outline-none');
  });
});
