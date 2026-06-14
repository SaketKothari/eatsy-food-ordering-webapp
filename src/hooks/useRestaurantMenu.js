import { useEffect, useState } from 'react';
import { MENU_API } from '../utils/constants';

// Swiggy uses @type paths like:
//   "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
//   "type.googleapis.com/swiggy.gandalf.widgets.v2.Restaurant"
function typeIncludes(obj, fragment) {
  const t = obj?.card?.card?.['@type'] ?? '';
  return t.includes(fragment);
}

function extractResInfo(cards = []) {
  // Primary: look for a card whose @type contains "Restaurant"
  const card = cards.find((item) => typeIncludes(item, 'Restaurant'));
  if (card?.card?.card?.info) return card.card.card.info;

  // Fallback: look for a card that has an `info` object with a `name` field
  for (const item of cards) {
    const info = item?.card?.card?.info;
    if (info?.name) return info;
  }
  return null;
}

function extractMenuCards(cards = []) {
  // Primary: groupedCard path
  const grouped = cards.find((obj) => obj.groupedCard);
  const regularCards =
    grouped?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];

  const menuCards = regularCards.filter(
    (obj) =>
      typeIncludes(obj, 'ItemCategory') ||
      typeIncludes(obj, 'NestedItemCategory')
  );

  if (menuCards.length > 0) return menuCards;

  // Fallback: flat search for any card with itemCards
  return cards.filter(
    (obj) =>
      obj?.card?.card?.itemCards?.length > 0 ||
      obj?.card?.card?.categories?.length > 0
  );
}

function organizeMenuCards(menuCards = []) {
  return menuCards.map((item) => {
    const { title, itemCards = [], categories = [] } =
      item?.card?.card ?? {};
    const type = item?.card?.card?.['@type'] ?? '';

    if (type.includes('NestedItemCategory')) {
      return {
        title,
        type: 'nested',
        categories: categories.map((sub) => ({
          title: sub?.title,
          itemCards: sub?.itemCards ?? [],
        })),
      };
    }
    return { title, type: 'item', itemCards };
  });
}

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

      const cards = json?.data?.cards ?? [];
      setResInfo(extractResInfo(cards));
      setResMenu(organizeMenuCards(extractMenuCards(cards)));
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  return { resInfo, resMenu };
};

export default useRestaurantMenu;
