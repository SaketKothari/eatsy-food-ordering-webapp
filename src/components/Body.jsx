import { useState, useEffect } from 'react';

import { FETCH_RESTAURANT_URL } from '../utils/constants';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';

const Body = () => {
  const [filterRestaurant, setFilterRestaurant] = useState([]);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(FETCH_RESTAURANT_URL);
      const json = await data.json();
      const restaurants =
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setListOfRestaurants(restaurants);
      setFilterRestaurant(restaurants);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    const filteredRestaurant = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterRestaurant(filteredRestaurant);

    if (filteredRestaurant.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setSearchText('');
  };

  const topRatedRestaurants = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4
    );
    setFilterRestaurant(filteredList);
    setNotFound(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyUp={handleKeyPress}
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>

        <button className="filter-btn" onClick={topRatedRestaurants}>
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {filterRestaurant.length === 0 && notFound ? (
          <p>No results found</p>
        ) : (
          filterRestaurant.map((restaurant) => (
            <RestaurantCard
              key={restaurant?.info.id}
              resData={restaurant?.info}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
