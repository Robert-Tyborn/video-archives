import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { MemoryRouter } from 'react-router-dom';

type Movie = {
  id: number;
  title: string;
};

type MovieDisplayProps = {
  movies: Movie[];
  title: string;
};

vi.mock('../movieDisplay/MovieDisplay', () => ({
  MovieDisplay: ({ movies, title }: MovieDisplayProps) => (
    <div>
      <h2>{title}</h2>
      {movies.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  ),
}));

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

  it('renders Navbar component', () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    expect(screen.getByText('Video Archives')).toBeInTheDocument();
  });

  it('shows "No results found" if there are no results', () => {
    sessionStorage.removeItem('searchedMovie');
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders MovieDisplay with correct movies when there are results', () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('Gladiator')).toBeInTheDocument();
  });

  it('correctly retrieves movies from sessionStorage', () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );
    const storedMovies = JSON.parse(
      sessionStorage.getItem('searchedMovie') || '[]'
    );
    expect(storedMovies).toEqual([{ title: 'Gladiator', id: 1 }]);
  });

  it('updates the display when the search query changes', () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );

    sessionStorage.setItem(
      'searchedMovie',
      JSON.stringify([{ title: 'Inception', id: 2 }])
    );
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );

    expect(screen.getByText('Inception')).toBeInTheDocument();
  });
});
