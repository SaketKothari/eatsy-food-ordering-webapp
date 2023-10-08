import { useState, useEffect } from 'react';
import { FETCH_RESTAURANT_URL } from '../utils/constants';

const useRestaurant = () => {
  const cardIndex = window.innerWidth >= 400 ? 2 : 3;
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
        json?.data?.cards[cardIndex]?.card?.card?.gridElements?.infoWithStyle
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
