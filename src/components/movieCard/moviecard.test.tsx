/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render, screen } from '@testing-library/react';
import { fetchMovieData } from '../../utilities/fetch';
import mockMovies from '../../../public/data/movies.json';
import MovieCard from './MovieCard';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../utilities/fetch', () => ({
  fetchMovieData: vi.fn(),
}));

describe('renders the moviecard component', () => {
  const mockMovie = mockMovies[0];

  beforeEach(async () => {
    (fetchMovieData as any).mockResolvedValue(mockMovies);
    await act(async () => {
      render(
        <MemoryRouter>
          <MovieCard movie={mockMovie} size="small" />
        </MemoryRouter>
      );
    });
  });
  it('should render the correct data in the moviecard', () => {
    const movieCard = screen.getByTestId('movieCard');
    expect(movieCard).toBeInTheDocument();
    expect(screen.getByAltText(mockMovie.title)).toBeInTheDocument();

    const movieImage = screen.getByAltText(mockMovie.title);
    expect(movieImage).toHaveAttribute('src', mockMovie.thumbnail);
    expect(screen.getByText(`Released: ${mockMovie.year}`)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
  });
});
