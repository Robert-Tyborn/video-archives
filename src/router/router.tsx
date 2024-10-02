// import { createBrowserRouter } from 'react-router-dom';
// import { Home } from '../pages/home/Home';
// import { BookmarkedMovies } from '../components/bookMark/BookmarkedMovies';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: "/bookmarked",
//     element: <BookmarkedMovies />,
//   },
  
// ]);

// export default router;

// import { createBrowserRouter, Outlet } from 'react-router-dom';
// import { Home } from '../pages/home/Home';
// import { BookmarkedMovies } from '../components/bookMark/BookmarkedMovies';
// import { Movie } from '../utilities/interfaces';

// type RouterProps = {
//   bookmarkedMovies: Movie[];
//   toggleBookmark: (movie: Movie) => void;
// };

// const Layout: React.FC<RouterProps> = ({ bookmarkedMovies, toggleBookmark }) => (
//   <Outlet context={{ bookmarkedMovies, toggleBookmark }} />
// );

// const createRouter = ({ bookmarkedMovies, toggleBookmark }: RouterProps) => {
//   return createBrowserRouter([
//     {
//       element: <Layout bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />,
//       children: [
//         {
//           path: '/',
//           element: <Home bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />,
//         },
//         {
//           path: '/bookmarked',
//           element: <BookmarkedMovies />,
//         },
//       ],
//     },
//   ]);
// };

// export default createRouter;


import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { BookmarkedMovies } from '../components/bookMark/BookmarkedMovies';
import { Movie } from '../utilities/interfaces';

type LayoutProps = {
  bookmarkedMovies: Movie[];
  toggleBookmark: (movie: Movie) => void;
};

const Layout = ({ bookmarkedMovies, toggleBookmark }: LayoutProps) => (
  <>
    <Outlet context={{ bookmarkedMovies, toggleBookmark }} />
  </>
);

const createRouter = (bookmarkedMovies: Movie[], toggleBookmark: (movie: Movie) => void) => {
  return createBrowserRouter([
    {
      element: <Layout bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />,
      children: [
        {
          path: '/',
          element: <Home bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />,
        },
        {
          path: '/bookmarked',
          element: <BookmarkedMovies />,
        },
      ],
    },
  ]);
};

export default createRouter;
