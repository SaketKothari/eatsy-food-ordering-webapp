import { useContext } from 'react';
import { IMAGE_CDN_URL } from '../utils/constants';
import UserContext from '../context/UserContext';

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } = resData;
  const { loggedInUser } = useContext(UserContext);

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
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            {loggedInUser}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

// Higher order component
export const withIsOpenLabel = (RestaurantCard) => {
  // return a new component with a isOpen label on top of it
  return (props) => {
    // a component is a function which returns some piece of JSX
    return (
      <>
        <div className="relative z-10 w-5 h-5">
          <label className="absolute transform rotate-30 bg-slate-700 text-center text-white py-1 right-[-1.25rem] top-[1.25rem] w-[2.5rem] rounded-lg">
            Open
          </label>
        </div>
        <RestaurantCard {...props} />
      </>
    );
  };
};
