/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render, screen } from '@testing-library/react';
import { Categories } from './Categories';
import { fetchMovieData } from '../../utilities/fetch';
import mockMovies from '../../../public/data/movies.json';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../utilities/fetch', () => ({
  fetchMovieData: vi.fn(),
}));

describe('Categories component', () => {
  beforeEach(async () => {
    (fetchMovieData as any).mockResolvedValue(mockMovies);
    await act(async () => {
      render(
        <MemoryRouter>
          <Categories />
        </MemoryRouter>
      );
    });
  });

  test('If genres are fetched and rendered properly (no duplicates)', async () => {
    expect(await screen.findByLabelText('Action')).toBeInTheDocument();
    expect(await screen.findByLabelText('Romance')).toBeInTheDocument();
    expect(await screen.findByLabelText('Drama')).toBeInTheDocument();
    const drama = await screen.findAllByLabelText('Drama');
    expect(drama).toHaveLength(1);
  });

  test('Check if possible to render by category and if no category is choosen, no movies are rendered', async () => {
    let movies = screen.queryAllByTestId('movieCard');
    expect(movies.length).toBe(0);

    const actionCheckbox = await screen.findByLabelText('Action');
    await userEvent.click(actionCheckbox);

    movies = await screen.findAllByTestId('movieCard');
    expect(movies.length).not.toBe(0);

    await userEvent.click(actionCheckbox);
    movies = screen.queryAllByTestId('movieCard');
    expect(movies.length).toBe(0);
  });

  test('Updates active filter correctly and render movies', async () => {
    const actionCheckbox = await screen.findByLabelText('Action');
    const dramaCheckbox = await screen.findByLabelText('Drama');
    const adventureCheckbox = await screen.findByLabelText('Adventure');
    await userEvent.click(actionCheckbox);
    await userEvent.click(dramaCheckbox);
    await userEvent.click(adventureCheckbox);

    expect(screen.getByText('Action, Drama, Adventure')).toBeInTheDocument();
    const movies = await screen.findAllByTestId('movieCard');
    expect(movies.length).not.toBe(0);
  });
});
