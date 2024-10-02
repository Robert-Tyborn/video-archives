// import { RouterProvider } from 'react-router-dom'
// import './App.css'
// import router from './router/router'
// import { useState, useEffect } from 'react';


// function App() {
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
//       setBookmarkedMovies([...bookmarkedMovies, movie]);
//     }
//   };


//   return (
//     <>
//      <RouterProvider router={ router } />
//     </>
//   )
// }

// export default App

import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import createRouter from './router/router';
import { Movie } from './utilities/interfaces';

function App() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedMovies');
    if (savedBookmarks) {
      setBookmarkedMovies(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedMovies));
  }, [bookmarkedMovies]);

  const toggleBookmark = (movie: Movie) => {
    console.log(`Toggling bookmark for: ${movie.title}`); 
  
    setBookmarkedMovies(prev => {
      
      const isBookmarked = prev.some(m => m.title === movie.title);
      console.log(`Is Bookmarked: ${isBookmarked}`); /
  
      if (isBookmarked) {
        console.log(`Removing bookmark for: ${movie.title}`); 
        const updatedMovies = prev.filter(m => m.title !== movie.title);
        console.log('Updated Bookmarked Movies after removal:', updatedMovies); 
        return updatedMovies; 
      } else {
        console.log(`Adding to bookmarks: ${movie.title}`); 
        const newMovie = { ...movie, bookmarked: true }; 
        const updatedMovies = [...prev, newMovie]; 
        console.log('Updated Bookmarked Movies after addition:', updatedMovies); 
        return updatedMovies; 
      }
    });
  }
  const router = createRouter(bookmarkedMovies, toggleBookmark);

  return <RouterProvider router={router} />;
}

export default App;