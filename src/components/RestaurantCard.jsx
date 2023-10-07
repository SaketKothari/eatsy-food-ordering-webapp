import { IMAGE_CDN_URL } from '../utils/constants';

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } = resData;

  return (
    <div className="relative h-[400px] w-[300px] rounded-md">
      <img
        className="z-0 h-full w-full rounded-md object-cover"
        src={IMAGE_CDN_URL + cloudinaryImageId}
        alt="restaurant-image"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-left">
        <h1 className="text-lg font-semibold text-white">{name}</h1>
        <p className="mt-2 text-sm text-gray-300">{cuisines.join(', ')}</p>
        <div className="mt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            {avgRating}
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            {costForTwo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
