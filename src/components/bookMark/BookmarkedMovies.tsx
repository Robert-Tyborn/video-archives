// import { useState, useEffect } from 'react';

// export const BookmarkedMovies = () => {
//     const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);
  
//     useEffect(() => {
//       const savedBookmarks = localStorage.getItem('bookmarkedMovies');
//       if (savedBookmarks) {
//         setBookmarkedMovies(JSON.parse(savedBookmarks));
//       }
//     }, []);
  
//     return (
//       <section className="bookmarkedMovies-container">
//         <h3>Bookmarked Movies</h3>
//         {bookmarkedMovies.length > 0 ? (
//           <section className="bookmarkedMovies-list">
//             {bookmarkedMovies.map((movie) => (
//               <article key={movie.title} data-testid="bookmarkedMovieCard">
//                 <h4>{movie.title}</h4>
//                 <img src={movie.thumbnail} alt={movie.title} />
//               </article>
//             ))}
//           </section>
//         ) : (
//           <p>No bookmarked movies.</p>
//         )}
//       </section>
//     );
//   };

// import { useOutletContext } from 'react-router-dom';
// import { Movie } from '../../utilities/interfaces';

// type BookmarkedMoviesContext = {
//     bookmarkedMovies: Movie[];
//     toggleBookmark: (movie: Movie) => void;
// };
  
// export const BookmarkedMovies: React.FC = () => {
//   const context = useOutletContext<BookmarkedMoviesContext>();

//   console.log('BookmarkedMovies Context:', context); // Check context

//   if (!context) {
//     return <div>Error: Context is undefined. Make sure you're using Outlet correctly.</div>;
//   }

//   const { bookmarkedMovies, toggleBookmark } = context;

//   console.log('Bookmarked Movies (before rendering):', bookmarkedMovies); // Check bookmarked movies

//   return (
//     <section className="bookmarkedMovies-container">
//       <h3>Bookmarked Movies</h3>
//       {bookmarkedMovies.length > 0 ? (
//         <section className="bookmarkedMovies-list">
//           {bookmarkedMovies.map((movie) => (
//             <article key={movie.title} data-testid="bookmarkedMovieCard">
//               <h4>{movie.title}</h4>
//               <img src={movie.thumbnail} alt={movie.title} />
//               <button onClick={() => toggleBookmark(movie)}>Remove Bookmark</button>
//             </article>
//           ))}
//         </section>
//       ) : (
//         <p>No bookmarked movies. (Total: {bookmarkedMovies.length})</p>
//       )}
//     </section>
//   );
// };

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Movie } from '../../utilities/interfaces';
type BookmarkedMoviesContext = {
  bookmarkedMovies: Movie[];
  toggleBookmark: (movie: Movie) => void;
};

export const BookmarkedMovies: React.FC = () => {
  const context = useOutletContext<BookmarkedMoviesContext>();

  // Debugging: Log the entire context
  console.log('BookmarkedMovies Context:', context);

  // Check if context is undefined
  if (!context) {
    return <div>Error: Context is undefined. Make sure you're using Outlet correctly.</div>;
  }

  const { bookmarkedMovies, toggleBookmark } = context;

  // Debugging: Log the bookmarkedMovies array
  console.log('Bookmarked Movies:', bookmarkedMovies);

  return (
    <section className="bookmarkedMovies-container">
      <h3>Bookmarked Movies</h3>
      {bookmarkedMovies && bookmarkedMovies.length > 0 ? (
        <section className="bookmarkedMovies-list">
          {bookmarkedMovies.map((movie) => (
            <article key={movie.title} data-testid="bookmarkedMovieCard">
              <h4>{movie.title}</h4>
              <img src={movie.thumbnail} alt={movie.title} />
              <button onClick={() => toggleBookmark(movie)}>Remove Bookmark</button>
            </article>
          ))}
        </section>
      ) : (
        <p>No bookmarked movies. (Total: {bookmarkedMovies ? bookmarkedMovies.length : 0})</p>
      )}
    </section>
  );
};