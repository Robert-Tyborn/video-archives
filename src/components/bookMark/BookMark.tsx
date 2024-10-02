// type BookmarkProps = {
//   isBookmarked: boolean;
//   onToggle: () => void;
// };

// export const Bookmark = ({ isBookmarked, onToggle }: BookmarkProps) => {
//   return (
//     <button className={`bookmark-icon ${isBookmarked ? 'bookmarked' : ''}`} onClick={onToggle}>
//       {isBookmarked ? '★' : '☆'}  
//     </button>
//   );
// };



type BookmarkProps = {
  isBookmarked: boolean;
  onToggle: () => void;
};

export const Bookmark = ({ isBookmarked, onToggle }: BookmarkProps) => {
  return (
    <button className={`bookmark-icon ${isBookmarked ? 'bookmarked' : ''}`} onClick={onToggle}>
      {isBookmarked ? '★' : '☆'}
    </button>
  );
};