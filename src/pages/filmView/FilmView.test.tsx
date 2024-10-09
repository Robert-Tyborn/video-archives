/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FilmView from './FilmView';
import { fetchMovieData } from '../../utilities/fetch';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock the fetchMovieData function
vi.mock('../../utilities/fetch', () => ({
  fetchMovieData: vi.fn(),
}));

// Create a mock movie object
const mockMovie = {
  title: 'Inception',
  year: 2010,
  rating: '8.8',
  genre: 'Sci-Fi',
  actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
  synopsis: 'A thief who steals corporate secrets...',
  thumbnail: 'mock-thumbnail-url.jpg',
};

describe('FilmView Component', () => {
  it('renders the FilmView component and displays movie information', async () => {
    // Mock the fetchMovieData function to resolve with the mock movie array
    (fetchMovieData as any).mockResolvedValue([mockMovie]);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: `/film/Inception`, state: { movie: mockMovie } }]}>
          <Routes>
            <Route path="/film/:title" element={<FilmView />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Use screen.debug() if you want to inspect the rendered output
    screen.debug();

    // Check that the movie details are rendered correctly
    expect(await screen.findByText(/Inception/i)).toBeInTheDocument();
    expect(await screen.findByText(/Released: 2010/i)).toBeInTheDocument();
    expect(await screen.findByText(/Rating: 8.8/i)).toBeInTheDocument();
    expect(await screen.findByText(/Genre: Sci-Fi/i)).toBeInTheDocument();
    expect(await screen.findByText(/Actors: Leonardo DiCaprio, Joseph Gordon-Levitt/i)).toBeInTheDocument();
    expect(await screen.findByText(/A thief who steals corporate secrets/i)).toBeInTheDocument();

    // Optional: Check if the image renders with the correct src
    const image = screen.getByAltText('Inception');
    expect(image).toHaveAttribute('src', 'mock-thumbnail-url.jpg');
  });
});
