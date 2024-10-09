import { useEffect, useState } from 'react';
import './Bookmark.css';

type BookmarkProps = {
  movie: Movie;
};

const Bookmark: React.FC<BookmarkProps> = ({ movie }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const storedBookmarks = JSON.parse(
      localStorage.getItem('bookmarks') || '[]'
    );
    const isMovieBookmarked = storedBookmarks.some(
      (bookmark: Movie) => bookmark.title === movie.title
    );
    setIsBookmarked(isMovieBookmarked);
  }, [movie]);

  const handleToggleBookmark = () => {
    const storedBookmarks = JSON.parse(
      localStorage.getItem('bookmarks') || '[]'
    );

    if (isBookmarked) {
      const updatedBookmarks = storedBookmarks.filter(
        (bookmark: Movie) => bookmark.title !== movie.title
      );
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      storedBookmarks.push(movie);
      localStorage.setItem('bookmarks', JSON.stringify(storedBookmarks));
    }

    setIsBookmarked(!isBookmarked);
  };

  return (
    <button
      onClick={e => {
        e.stopPropagation();
        handleToggleBookmark();
      }}
      className="bookmark-button"
    >
      <span className={isBookmarked ? 'star bookmarked' : 'star'}>
        {isBookmarked ? '★' : '☆'}
      </span>
    </button>
  );
};

export default Bookmark;
