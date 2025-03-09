import { useEffect, useState } from 'react';
import { MENU_API } from '../utils/constants';

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [resMenu, setResMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      const json = await data.json();
      setResInfo(
        json?.data?.cards?.find((item) =>
          item?.card?.card['@type']?.includes('food.v2.Restaurant')
        )?.card?.card?.info
      );

      const menuData = json?.data?.cards
        ?.find((obj) => obj.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (obj) =>
            obj?.card?.card['@type']?.includes('ItemCategory') ||
            obj?.card?.card['@type']?.includes('NestedItemCategory')
        );
      // console.log('Menu Data:', menuData);

      const organizedMenuData = menuData?.map((item) => {
        const title = item?.card?.card?.title;
        const type = item?.card?.card['@type'];
        const itemCards = item?.card?.card?.itemCards || [];
        const categories = item?.card?.card?.categories || [];

        if (type?.includes('NestedItemCategory')) {
          return {
            title,
            type: 'nested',
            categories: categories.map((subCategory) => {
              return {
                title: subCategory?.title,
                itemCards: subCategory?.itemCards,
              };
            }),
          };
        } else {
          return { title, type: 'item', itemCards };
        }
      });
      setResMenu(organizedMenuData);
      // console.log('Organized Menu Data:', organizedMenuData);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  return { resInfo, resMenu };
};

export default useRestaurantMenu;
