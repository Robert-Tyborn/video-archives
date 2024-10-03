import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Categories } from '../pages/categories/Categories';

const router = createBrowserRouter([
  {
    path: '/video-archives/',
    element: <Home />,
  },
  {
    path: '/video-archives/categories',
    element: <Categories />,
  },
]);

export default router;
