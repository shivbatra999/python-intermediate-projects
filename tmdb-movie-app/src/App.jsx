import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import MovieHooksExample from './components/MovieHooksExample';
import SearchPage from './pages/SearchPage';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

// Home page component
const HomePage = () => (
  <div className="container mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold mb-6">Welcome to MovieDB</h2>
    <MovieHooksExample />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
