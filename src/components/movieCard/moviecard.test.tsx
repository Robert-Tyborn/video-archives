import { render, screen } from '@testing-library/react';
import mockMovies from '../../../public/data/movies.json';
import MovieCard from './MovieCard';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('renders the moviecard component', () => {
  const mockMovie = mockMovies[0];

  it('should render the correct data in the moviecard', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} size="small" />
      </MemoryRouter>
    );
    const movieCard = screen.getByTestId('movieCard');
    expect(movieCard).toBeInTheDocument();
    expect(screen.getByAltText(mockMovie.title)).toBeInTheDocument();

    const movieImage = screen.getByAltText(mockMovie.title);
    expect(movieImage).toHaveAttribute('src', mockMovie.thumbnail);
    expect(screen.getByText(`Released: ${mockMovie.year}`)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
  });

  it('should navigate to FilmView with correct movie data on card click', async () => {
    const navigateMock = vi.mocked(useNavigate);
    navigateMock.mockReturnValue(vi.fn());

    vi.mocked(useNavigate).mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} size="small" />
      </MemoryRouter>
    );

    const movieCard = screen.getByTestId('movieCard');
    await userEvent.click(movieCard);

    expect(navigateMock).toHaveBeenCalledWith(
      `/video-archives/filmview/${mockMovie.title}`,
      { state: mockMovie }
    );
  });
});
