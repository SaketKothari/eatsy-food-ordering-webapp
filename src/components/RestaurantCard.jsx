import { IMAGE_CDN_URL } from '../utils/constants';

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    deliveryTime,
  } = resData?.data;

  return (
    <div className="res-card">
      <img className="res-logo" src={IMAGE_CDN_URL + cloudinaryImageId} />
      <div className="res-info">
        <h3>{name}</h3>
        <h3>{cuisines.join(', ')}</h3>
        <div className="res-details">
          <h4>{avgRating} stars</h4>
          <h4>{costForTwo / 100} FOR TWO</h4>
          <h4>{deliveryTime} minutes</h4>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
