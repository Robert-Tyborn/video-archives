/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Home } from './Home';
import { fetchMovieData } from '../../utilities/fetch';
import mockMovies from '../../../public/data/movies.json';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../utilities/fetch', () => ({
  fetchMovieData: vi.fn(),
}));

describe('Home Component', () => {
  it('renders the Home component and displays movie lists', async () => {
    (fetchMovieData as any).mockResolvedValue(mockMovies);
    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });
    screen.debug();
    expect(await screen.findByText(/Trending/i)).toBeInTheDocument();
    expect(await screen.findByText(/Recommended/i)).toBeInTheDocument();
    const movieCards = screen.getAllByTestId('movieCard');
    expect(movieCards.length).toBeGreaterThan(0);
  });
});
