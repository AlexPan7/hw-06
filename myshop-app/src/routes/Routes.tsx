import { createBrowserRouter } from 'react-router-dom';

import { Home, Products, NotFound } from '../pages'
import PublicLayout from '../layout/PublicLayout';

export const routes = createBrowserRouter ([
 {
  element: <PublicLayout />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: '/products',
      element: <Products />
    },
  ]
 }
])