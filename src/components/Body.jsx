import { resList } from '../utils/mockData';
import RestaurantCard from './RestaurantCard';

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        {resList.map((restaurant, id) => (
          <RestaurantCard key={id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
