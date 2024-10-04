import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Search from './Search';

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
  it('alert when input field is empty', async () => {
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

  it('shows the loading screen with correct text only', () => {
    render(
      <MemoryRouter>
        
      </MemoryRouter>
    );
    expect
  });
});
