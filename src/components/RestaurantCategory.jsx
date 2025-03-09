import RestaurantCategoryItem from './RestaurantCategoryItem';

const RestaurantCategory = ({ data, showItems, toggleCategory, dummy }) => {
  return (
    <>
      {/* Accordion Header */}
      <div className="w-[72%] mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={toggleCategory}
        >
          <span className="font-bold text-lg">
            {data.title} ({data?.itemCards?.length})
          </span>
          <span>{showItems ? '⬆️' : '⬇️'}</span>
        </div>

        {/* Accordion Body */}
        {showItems && (
          <RestaurantCategoryItem dummy={dummy} items={data.itemCards} />
        )}
      </div>
    </>
  );
};

export default RestaurantCategory;
