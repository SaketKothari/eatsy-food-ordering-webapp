import RestaurantCategoryItem from './RestaurantCategoryItem';

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <>
      {/* Accordion Header */}
      <div className="w-[72%] mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>

        {/* Accordion Body */}
        {showItems && <RestaurantCategoryItem items={data.itemCards} />}
      </div>
    </>
  );
};

export default RestaurantCategory;
