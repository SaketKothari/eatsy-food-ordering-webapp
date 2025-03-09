import { useState } from 'react';
import RestaurantCategory from './RestaurantCategory';

const NestedItemCategory = (props) => {
  const { title, categories } = props?.data;
  const [showSubCategoryIndex, setShowSubCategoryIndex] = useState(null);

  const toggleSubCategory = (index) => {
    setShowSubCategoryIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <>
      <h2 className="font-bold text-xl mt-8 mb-4">{title}</h2>
      <div>
        {categories.map((subCategory, index) => (
          <RestaurantCategory
            key={subCategory?.title}
            data={{
              title: subCategory?.title,
              itemCards: subCategory?.itemCards,
            }}
            showItems={index === showSubCategoryIndex}
            toggleCategory={() => toggleSubCategory(index)}
            dummy="Dummy data"
          />
        ))}
      </div>
    </>
  );
};

export default NestedItemCategory;
