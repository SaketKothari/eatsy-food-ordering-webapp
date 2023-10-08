import React, { lazy, Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import About from './pages/About';
import Contact from './pages/Contact';

import Body from './components/Body';
import Cart from './components/Cart';
import Error from './components/Error';
import Footer from './components/Footer';
import Header from './components/Header';
const Instamart = lazy(() => import('./components/Instamart'));
import RestaurantMenu from './components/RestaurantMenu';

import appStore from './store/appStore';
import UserContext from './context/UserContext';

const AppLayout = () => {
  const [userName, setUserName] = useState();
  // Authentication code
  useEffect(() => {
    // Make an API Call to send username and password
    const data = {
      name: 'John Doe',
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/instamart',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Instamart />
          </Suspense>
        ),
      },
      {
        path: '/restaurants/:resId',
        element: <RestaurantMenu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
