import React, { lazy, Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';

import Body from './components/Body';
import Error from './components/Error';
import Footer from './components/Footer';
import Header from './components/Header';
const Instamart = lazy(() => import('./components/Instamart'));
import RestaurantMenu from './components/RestaurantMenu';

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
    <UserContext.Provider value={{ loggedInUser: userName }}>
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
