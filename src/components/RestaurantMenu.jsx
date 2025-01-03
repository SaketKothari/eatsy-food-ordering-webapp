import { useParams } from 'react-router-dom';
import { useState } from 'react';

import Shimmer from './Shimmer';
import RestaurantCategory from './RestaurantCategory';
import useRestaurantMenu from '../hooks/useRestaurantMenu';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  const cardIndex = window.innerWidth >= 400 ? 4 : 3;
  const dummy = 'Dummy data';

  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const categories = resInfo?.cards[
    cardIndex
  ]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) =>
      c.card?.card?.['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  );

  const toggleCategory = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-semibold text-lg">
        {cuisines?.join(', ')} - {costForTwoMessage}
      </p>

      {/* categories accordion */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          dummy={dummy}
          showItems={index === showIndex}
          toggleCategory={() => toggleCategory(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
