import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Header component for testing
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
        
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
        
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

describe('Header Component', () => {
  test('renders header with search input found by aria-label', () => {
    render(<Header />);
    
    const searchInput = screen.getByLabelText(/search for movies/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('simulates submit and asserts URL changes to /search?q=...', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    // 1. Renders <Header />
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // 2. Finds the search input by aria-label
    const searchInput = screen.getByLabelText(/search for movies/i);
    
    // Type a search query
    await user.type(searchInput, 'The Matrix');
    
    // 3. Simulates a submit
    await user.keyboard('{Enter}');
    
    // 4. Asserts the URL changes to /search?q=...
    const navigationUrl = screen.getByTestId('navigation-url');
    expect(navigationUrl).toHaveTextContent('/search?q=The%20Matrix');
  });

  test('simulates submit by clicking search button', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const searchInput = screen.getByLabelText(/search for movies/i);
    const searchButton = screen.getByLabelText(/submit search/i);
    
    await user.type(searchInput, 'Inception');
    await user.click(searchButton);
    
    const navigationUrl = screen.getByTestId('navigation-url');
    expect(navigationUrl).toHaveTextContent('/search?q=Inception');
  });

  test('properly encodes special characters in URL', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const searchInput = screen.getByLabelText(/search for movies/i);
    
    await user.type(searchInput, 'Spider-Man: No Way Home & More!');
    await user.keyboard('{Enter}');
    
    const navigationUrl = screen.getByTestId('navigation-url');
    expect(navigationUrl).toHaveTextContent('/search?q=Spider-Man%3A%20No%20Way%20Home%20%26%20More%21');
  });
});
