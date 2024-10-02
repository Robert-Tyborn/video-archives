import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Categories } from '../pages/category/Categories';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
]);

export default router;
