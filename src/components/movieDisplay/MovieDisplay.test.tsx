import { render, screen } from '@testing-library/react';
import MovieDisplay from './MovieDisplay';
import movieData from '../../../public/data/movies.json';
import { MemoryRouter } from 'react-router-dom';

describe('MovieDisplay component', () => {
  const mockMovies = movieData.slice(0, 2);

  it('Assert if movie display renders the correct title', () => {
    render(
      <MemoryRouter>
        <MovieDisplay movies={mockMovies} title="Recommended" size="small" />
      </MemoryRouter>
    );
    const title = screen.getByText('Recommended');
    expect(title).toBeInTheDocument();
  });

  it('Assert if the component renders the correct number of MovieCard components', () => {
    render(
      <MemoryRouter>
        <MovieDisplay movies={mockMovies} title="Recommended" size="small" />
      </MemoryRouter>
    );
    const movieCards = screen.getAllByTestId('movieCard');
    expect(movieCards).toHaveLength(mockMovies.length);
  });

  it('Assert if correct movies are rendered (check thumbnail img alt text)', () => {
    render(
      <MemoryRouter>
        <MovieDisplay movies={mockMovies} title="Recommended" size="small" />
      </MemoryRouter>
    );
    mockMovies.forEach(movie => {
      const movieCardImg = screen.getByAltText(movie.title);
      expect(movieCardImg).toBeInTheDocument();
    });
  });

  it('Doesnt render movies when no movies are passed', () => {
    render(
      <MemoryRouter>
        <MovieDisplay movies={[]} title="" size="large" />
      </MemoryRouter>
    );

    const movieCards = screen.queryAllByTestId('movieCard');
    expect(movieCards).toHaveLength(0);
    const title = screen.getByRole('heading');
    expect(title).toHaveTextContent('');
  });
});
