import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Categories } from '../pages/categories/Categories';
import SearchResults from '../components/searchResults/SearchResults';
import FilmView from '../pages/filmView/FilmView';

const router = createBrowserRouter([
  {
    path: '/video-archives/',
    element: <Home />,
  },
  {
    path: '/video-archives/categories',
    element: <Categories />,
  },
  {
    path: '/video-archives/search-results',
    element: <SearchResults />,
  },
  {
    path: '/video-archives/filmview/:id',
    element: <FilmView />,
  },
]);

export default router;
