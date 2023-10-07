import { IMAGE_CDN_URL } from '../utils/constants';
import { Plus, Heart } from 'lucide-react';

const RestaurantCategoryItem = ({ items }) => {
  const truncateDescription = (description) => {
    if (description) {
      const words = description.split(' ');
      if (words.length > 10) {
        return words.slice(0, 10).join(' ') + ' ...';
      } else {
        return description;
      }
    } else {
      return ''; // Handle cases where description is undefined
    }
  };

  return (
    <>
      <ul className="flex flex-col divide-y divide-gray-200">
        {items.map((item) => (
          <li
            className="flex flex-col py-6 sm:flex-row sm:justify-between"
            key={item.card.info.id}
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={IMAGE_CDN_URL + item.card.info.imageId}
                alt="meun-items image"
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                      {item.card.info.name}
                    </h3>
                    <p className="text-xs">
                      {truncateDescription(item.card.info.description)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ₹
                      {item.card.info.price
                        ? item.card.info.price / 100
                        : item.card.info.defaultPrice / 100}
                    </p>
                  </div>
                </div>

                <div className="flex divide-x text-sm">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-2 py-1 pl-0"
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-2 py-1"
                  >
                    <Heart size={16} />
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RestaurantCategoryItem;
