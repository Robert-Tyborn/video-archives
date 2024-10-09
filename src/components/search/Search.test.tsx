import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { fetchMovieData } from '../../utilities/fetch';
import { useNavigate } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

vi.mock('../../utilities/fetch', () => ({
  fetchMovieData: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Search component tests', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText('Search for a movie...')
    ).toBeInTheDocument();
  });

  it('updates input value on change', async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search for a movie...');
    await userEvent.type(input, 'Whiplash');
    expect(input).toHaveValue('Whiplash');
  });

  it('alerts when input field is empty', async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    window.alert = vi.fn();
    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Please enter a movie name.');
  });
});

describe('Search component functionality tests', () => {
  const mockMovies = [{ title: 'Casablanca' }];
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it('calls fetchMovieData when a valid query is provided', async () => {
    (fetchMovieData as any).mockResolvedValue(mockMovies);
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search for a movie...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'Casablanca');
    await userEvent.click(button);

    expect(fetchMovieData).toHaveBeenCalledTimes(1);
    const storedTerm = sessionStorage.getItem('searchedMovie');
    expect(storedTerm).toEqual(JSON.stringify(mockMovies));
  });

  it('stores the search results in sessionStorage', async () => {
    (fetchMovieData as any).mockResolvedValue(mockMovies);
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search for a movie...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'Casablanca');
    await userEvent.click(button);

    await waitFor(() => {
      expect(sessionStorage.getItem('searchedMovie')).toEqual(
        JSON.stringify(mockMovies)
      );
    });
  });

  it('navigates to the search results page with the correct query', async () => {
    (fetchMovieData as any).mockResolvedValue(mockMovies);
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search for a movie...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'Casablanca');
    await userEvent.click(button); 

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/video-archives/search-results?query=Casablanca'
      );
    });
  });
});
