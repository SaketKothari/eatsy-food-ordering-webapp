import { Link } from 'react-router-dom';

import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';

import useOnlineStatus from '../hooks/useOnlineStatus';
import useRestaurant from '../hooks/useRestaurant';

const Body = () => {
  const onlineStatus = useOnlineStatus();
  const {
    filterRestaurant,
    handleKeyPress,
    handleSearch,
    listOfRestaurants,
    notFound,
    searchText,
    setSearchText,
    topRatedRestaurants,
  } = useRestaurant();

  if (onlineStatus === false) {
    return (
      <h1>Looks like you're offline! Please check your internet connection</h1>
    );
  }

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
            <Link
              key={restaurant?.info.id}
              to={'/restaurants/' + restaurant?.info.id}
            >
              <RestaurantCard resData={restaurant?.info} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
