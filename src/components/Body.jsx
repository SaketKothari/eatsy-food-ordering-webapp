import { Link } from 'react-router-dom';

import RestaurantCard, { withIsOpenLabel } from './RestaurantCard';
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
  const RestaurantCardIsOpen = withIsOpenLabel(RestaurantCard);

  if (onlineStatus === false) {
    return (
      <h1>Looks like you're offline! Please check your internet connection</h1>
    );
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="flex justify-center">
        {/* Search */}
        <div className="flex m-4 p-4 w-full items-center space-x-2 md:w-1/3">
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyUp={handleKeyPress}
          />
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={topRatedRestaurants}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {filterRestaurant.length === 0 && notFound ? (
          <p>No results found</p>
        ) : (
          filterRestaurant.map((restaurant) => (
            <Link
              key={restaurant?.info.id}
              to={'/restaurants/' + restaurant?.info.id}
            >
              {restaurant?.info.isOpen ? (
                <RestaurantCardIsOpen resData={restaurant?.info} />
              ) : (
                <RestaurantCard resData={restaurant?.info} />
              )}
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Body;
