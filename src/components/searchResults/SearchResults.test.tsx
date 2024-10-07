import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { MemoryRouter } from 'react-router-dom';

describe('SearchResults component tests', () => {
  beforeEach(() => {
    sessionStorage.setItem(
      'searchedMovie',
      JSON.stringify([{ title: 'Gladiator', id: 1 }])
    );
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

  it('show "No results found" if there are no results', () => {
    sessionStorage.removeItem('searchedMovie');
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
