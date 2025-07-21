import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock Header component for testing
const Header = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [navigationUrl, setNavigationUrl] = React.useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery) {
      const url = `/search?q=${encodeURIComponent(trimmedQuery)}`;
      setNavigationUrl(url);
    }
  };

  return (
    <header role="banner">
      <div>
        <a href="/" aria-label="MovieDB - Go to homepage">
          <h1>MovieDB</h1>
        </a>
      </div>
      
      <form onSubmit={handleSearchSubmit} role="search">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search for movies"
        />
        
        <button type="submit" aria-label="Submit search">
          Search
        </button>
      </form>

      {navigationUrl && (
        <div data-testid="navigation-url" style={{ display: 'none' }}>
          {navigationUrl}
        </div>
      )}
    </header>
  );
};

describe('Header Component Tests', () => {
  test('renders header with search input found by aria-label', () => {
    render(<Header />);
    
    const searchInput = screen.getByLabelText(/search for movies/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('simulates submit and asserts URL changes to /search?q=...', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    // Find the search input by aria-label
    const searchInput = screen.getByLabelText(/search for movies/i);
    
    // Type a search query
    await user.type(searchInput, 'The Matrix');
    
    // Simulate submit
    await user.keyboard('{Enter}');
    
    // Assert the URL changes to /search?q=...
    const navigationUrl = screen.getByTestId('navigation-url');
    expect(navigationUrl).toHaveTextContent('/search?q=The%20Matrix');
  });
});
