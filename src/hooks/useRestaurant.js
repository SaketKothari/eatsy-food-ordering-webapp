import { useState, useEffect } from 'react';
import { FETCH_RESTAURANT_URL } from '../utils/constants';

// Try multiple paths Swiggy has used to embed the restaurant grid
function extractRestaurants(cards = []) {
  // 1. Any card whose id contains "restaurant_grid" (covers v1, v2, listing_v2 …)
  const byId = cards.find((item) =>
    item?.card?.card?.id?.includes('restaurant_grid')
  );
  if (byId?.card?.card?.gridElements?.infoWithStyle?.restaurants?.length) {
    return byId.card.card.gridElements.infoWithStyle.restaurants;
  }

  // 2. Any card that directly carries a non-empty restaurants array
  for (const item of cards) {
    const restaurants =
      item?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    if (Array.isArray(restaurants) && restaurants.length > 0) return restaurants;
  }

  // 3. Flat search anywhere in the tree (last resort)
  for (const item of cards) {
    const restaurants = item?.groupedCard?.cardGroupMap?.REGULAR?.cards
      ?.flatMap((c) => c?.card?.card?.restaurants ?? []);
    if (restaurants?.length > 0) return restaurants;
  }

  return [];
}

const useRestaurant = () => {
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
      const restaurants = extractRestaurants(json?.data?.cards ?? []);
      setListOfRestaurants(restaurants);
      setFilterRestaurant(restaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleSearch = () => {
    const filteredRestaurant = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterRestaurant(filteredRestaurant);
    setNotFound(filteredRestaurant.length === 0);
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
    if (event.key === 'Enter') handleSearch();
  };

  return {
    filterRestaurant,
    handleKeyPress,
    handleSearch,
    listOfRestaurants,
    notFound,
    searchText,
    setSearchText,
    topRatedRestaurants,
  };
};

export default useRestaurant;
