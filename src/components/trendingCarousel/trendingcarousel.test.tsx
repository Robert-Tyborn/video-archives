/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render } from '@testing-library/react';
import { fetchMovieData } from '../../utilities/fetch';
import mockMovies from '../../../public/data/movies.json';
import TrendingCarousel from './TrendingCarousel';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../utilities/fetch', () => ({
  fetchMovieData: vi.fn(),
}));

describe('renders the trending component', async () => {
  beforeEach(async () => {
    (fetchMovieData as any).mockResolvedValue(mockMovies);
    await act(async () => {
      render(
        <MemoryRouter>
          <TrendingCarousel movies={mockMovies.slice(0, 3)} title="Trending" />
        </MemoryRouter>
      );
    });
  });

  it('should render the visablemoviecards in the carousel', async () => {
    const sliderContainer = document.querySelector('.slick-list');

    const visibleMovieCards = sliderContainer?.querySelectorAll(
      '.slick-slide:not(.slick-cloned) [data-testid="movieCard"]' // Eftersom att react-slick skapar massor kloner på grund av infinate scrolling ser vi till att bara välja de synliga i karusellen.
    );

    expect(visibleMovieCards?.length).toBe(3);
  });

  it('should render the arrows in the carousel', () => {
    const nextArrow = document.querySelector('.slick-next');
    expect(nextArrow).toBeInTheDocument();

    const prevArrow = document.querySelector('.slick-prev');
    expect(prevArrow).toBeInTheDocument();
  });
});
