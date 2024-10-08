import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Bookmark from './BookMark';

const localStorageMock = (() => {
  let store: Record<string, string[]> = {};
  return {
    getItem(key: string) {
      return store[key] ? JSON.stringify(store[key]) : null;
    },
    setItem(key: string, value: string) {
      store[key] = JSON.parse(value);
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Bookmark Component', () => {
  const mockMovie: Movie = {
    title: 'Inception',
    year: 2010,
    rating: 'PG-13',
    actors: ['Leonardo DiCaprio'],
    genre: 'Sci-Fi',
    synopsis: 'A thief who steals corporate secrets...',
    thumbnail: 'url_to_inception_poster',
  };

  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should render the correct button text based on bookmark status', () => {
    render(<Bookmark movie={mockMovie} />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('☆');
  });

  it('should add a movie to bookmarks and update button text when clicked', () => {
    render(<Bookmark movie={mockMovie} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(button.textContent).toBe('★');
    expect(localStorage.getItem('bookmarks')).toContain(
      JSON.stringify(mockMovie)
    );
  });

  it('should remove a movie from bookmarks and update button text when clicked', () => {
    localStorage.setItem('bookmarks', JSON.stringify([mockMovie]));
    render(<Bookmark movie={mockMovie} />);

    const button = screen.getByRole('button');
    expect(button.textContent).toBe('★');

    fireEvent.click(button);
    expect(button.textContent).toBe('☆');
    expect(localStorage.getItem('bookmarks')).not.toContain(
      JSON.stringify(mockMovie)
    );
  });
});
