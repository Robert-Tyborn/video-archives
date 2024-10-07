import { useEffect, useState } from 'react';

type BookmarkProps = {
  movie: Movie;
};

const Bookmark: React.FC<BookmarkProps> = ({ movie }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const isBookmarked = storedBookmarks.some((bookmark: Movie) => bookmark.title === movie.title);
    setIsBookmarked(isBookmarked);
  }, [movie]);

  const handleToggleBookmark = () => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

    if (isBookmarked) {
      const updatedBookmarks = storedBookmarks.filter((bookmark: Movie) => bookmark.title !== movie.title);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      storedBookmarks.push(movie);
      localStorage.setItem('bookmarks', JSON.stringify(storedBookmarks));
    }

    setIsBookmarked(!isBookmarked);
  };    

  return (
    <button onClick={handleToggleBookmark}>
      {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    </button>
  );
};

export default Bookmark;