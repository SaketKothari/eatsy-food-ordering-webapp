import { useParams } from 'react-router-dom';
import { useState } from 'react';

import Shimmer from './Shimmer';
import RestaurantCategory from './RestaurantCategory';
import useRestaurantMenu from '../hooks/useRestaurantMenu';
import NestedItemCategory from './NestedRestaurantCategory';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, resMenu } = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  const dummy = 'Dummy data';

  if (resInfo === null) {
    return <Shimmer />;
  }

  if (resMenu?.length === 0) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage, city } = resInfo;
  const categories = resMenu;

  const toggleCategory = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">
        {name}, {city}
      </h1>
      <p className="font-semibold text-lg">
        {cuisines?.join(', ')} - {costForTwoMessage}
      </p>

      {/* categories accordion */}
      {categories.map((category, index) =>
        category.type === 'item' ? (
          <RestaurantCategory
            key={category?.title}
            data={category}
            dummy={dummy}
            showItems={index === showIndex}
            toggleCategory={() => toggleCategory(index)}
          />
        ) : (
          <NestedItemCategory key={category?.title} data={category} />
        )
      )}
    </div>
  );
};

export default RestaurantMenu;
