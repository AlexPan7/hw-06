import { createBrowserRouter } from 'react-router-dom';

import { Home, Products, Cart, NotFound } from '../pages'
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
    {
      path: '/cart',
      element: <Cart />
    },
  ]
 }
])