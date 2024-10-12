import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  it('Renders the logo & navigation links with respective href', () => {
    expect(screen.getByText(/video archives/i)).toBeInTheDocument();
    const homeLink = screen.getByText(/home/i);
    const categoriesLink = screen.getByText(/categories/i);
    const bookmarksLink = screen.getByText(/bookmarks/i);

    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/video-archives/');
    expect(categoriesLink).toBeInTheDocument();
    expect(categoriesLink.closest('a')).toHaveAttribute(
      'href',
      '/video-archives/categories'
    );
    expect(bookmarksLink).toBeInTheDocument();
    expect(bookmarksLink.closest('a')).toHaveAttribute(
      'href',
      '/video-archives/bookmarks'
    );
  });

  it('Renders the Search component properly', () => {
    const searchComponent = screen.getByPlaceholderText(
      /search for a movie.../i
    );
    expect(searchComponent).toBeInTheDocument();
    const searchBtn = screen.getByRole('button');
    expect(searchBtn).toHaveClass('search-button');
  });
});
