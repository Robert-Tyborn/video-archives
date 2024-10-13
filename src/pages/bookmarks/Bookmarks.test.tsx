import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import Bookmarks from './Bookmarks';

describe('Bookmarks Component', () => {
  const mockMovies: Movie[] = [
    {
      title: 'Inception',
      year: 2010,
      rating: 'PG-13',
      actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
      genre: 'Action, Sci-Fi',
      synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
      thumbnail: '',
    },
    {
      title: 'Interstellar',
      year: 2014,
      rating: 'PG-13',
      actors: ['Matthew McConaughey', 'Anne Hathaway'],
      genre: 'Adventure, Drama',
      synopsis: 'A team of explorers travel through a wormhole in space.',
      thumbnail: '',
    },
  ];

  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(JSON.stringify(mockMovies)),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render bookmarked movies from localStorage', () => {
    render(
      <MemoryRouter>
        <Bookmarks />
      </MemoryRouter>
    );

    expect(screen.getByText('Your Bookmarked Movies')).toBeInTheDocument();

    mockMovies.forEach(movie => {
        expect(screen.getByAltText(movie.title)).toBeInTheDocument();
    });
  });

  it('should display a message when there are no bookmarked movies', () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(JSON.stringify([])),
      setItem: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Bookmarks />
      </MemoryRouter>
    );

    expect(screen.getByText('No movies have been bookmarked yet.')).toBeInTheDocument();
  });
});