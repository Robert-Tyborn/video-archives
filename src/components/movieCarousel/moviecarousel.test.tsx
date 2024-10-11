/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render } from '@testing-library/react';
import { fetchMovieData } from '../../utilities/fetch';
import mockMovies from '../../../public/data/movies.json';
import MovieCarousel from './MovieCarousel';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../utilities/fetch', () => ({
  fetchMovieData: vi.fn(),
}));

describe('renders the MovieCarousel component', () => {
  beforeEach(async () => {
    (fetchMovieData as any).mockResolvedValue(mockMovies);
    await act(async () => {
      render(
        <MemoryRouter>
          <MovieCarousel movies={mockMovies.slice(0, 5)} title="Recommended" />
          <MovieCarousel movies={mockMovies.slice(0, 5)} title="Movies" />
        </MemoryRouter>
      );
    });
  });

  it('should render the visible movie cards in both carousels', () => {
    const visibleMovieCards = document.querySelectorAll(
      '.slick-slide:not(.slick-cloned) [data-testid="movieCard"]'
    );

    expect(visibleMovieCards.length).toBe(10);
  });

  it('should render the arrows in both carousels', () => {
    const nextArrows = document.querySelectorAll('.slick-next');
    const prevArrows = document.querySelectorAll('.slick-prev');

    expect(nextArrows.length).toBe(2);
    expect(prevArrows.length).toBe(2);

    nextArrows.forEach(arrow => expect(arrow).toBeInTheDocument());
    prevArrows.forEach(arrow => expect(arrow).toBeInTheDocument());
  });
});
