import React from 'react';
import ReactDOM from 'react-dom/client';

import logo from './logo.png';
import { resList } from './mockData';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    deliveryTime,
  } = resData?.data;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={
          'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/' +
          cloudinaryImageId
        }
      />
      <div className="res-info">
        <h3>{name}</h3>
        <h3>{cuisines.join(', ')}</h3>
        <div className="res-details">
          <h4>{avgRating} stars</h4>
          <h4>{costForTwo / 100} FOR TWO</h4>
          <h4>{deliveryTime} minutes</h4>
        </div>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        {resList.map((restaurant, id) => (
          <RestaurantCard key={id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);
