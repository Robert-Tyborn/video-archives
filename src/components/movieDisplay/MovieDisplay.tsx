// import { useState, useEffect } from 'react';
// import { Bookmark } from '../bookMark/BookMark';


// type MovieDisplayProps = {
//   movies: Movie[]
//   title: string
//  }
 

// export const MovieDisplay = ({ movies, title }: MovieDisplayProps) => {
//   const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     const savedBookmarks = localStorage.getItem('bookmarkedMovies');
//     if (savedBookmarks) {
//       setBookmarkedMovies(JSON.parse(savedBookmarks));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedMovies));
//   }, [bookmarkedMovies]);

//   const toggleBookmark = (movie: Movie) => {
//     const isBookmarked = bookmarkedMovies.find((m) => m.title === movie.title);
//     if (isBookmarked) {
//       setBookmarkedMovies(bookmarkedMovies.filter((m) => m.title !== movie.title));
//     } else {
//       setBookmarkedMovies([...bookmarkedMovies, { ...movie, bookmarked: true }]);
//     }
//   };

//   return (
//     <section className="displayMovie-container">
//       <h3>{title}</h3>
//       <section className="displayMovie-container-movies">
//         {movies.map((movie) => (
//           <article key={movie.title} data-testid="movieCard">
//             <h4>{movie.title}</h4>
//             <img src={movie.thumbnail} alt={movie.title} />
//             <Bookmark
//               isBookmarked={!!bookmarkedMovies.find((m) => m.title === movie.title)}
//               onToggle={() => toggleBookmark(movie)}
//             />
//           </article>
//         ))}
//       </section>
//     </section>
//   );
// };


import { Bookmark } from "../bookMark/BookMark";
import { Movie } from "../../utilities/interfaces";

type MovieDisplayProps = {
  movies: Movie[];
  title: string;
  bookmarkedMovies: Movie[];
  toggleBookmark: (movie: Movie) => void;
};

export const MovieDisplay = ({ movies, title, bookmarkedMovies, toggleBookmark }: MovieDisplayProps) => {
  return (
    <section className="displayMovie-container">
      <h3>{title}</h3>
      <section className="displayMovie-container-movies">
        {movies.map((movie) => (
          <article key={movie.title} data-testid="movieCard">
            <h4>{movie.title}</h4>
            <img src={movie.thumbnail} alt={movie.title} />
            <Bookmark
              isBookmarked={bookmarkedMovies.some(m => m.title === movie.title)}
              onToggle={() => toggleBookmark(movie)}
            />
          </article>
        ))}
      </section>
    </section>
  );
};