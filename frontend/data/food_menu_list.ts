import { ty_menu_selectedItem } from "../types/menu_page.type";
import { ty_foodCategory } from "../types/food.type";

export type ty_menu_list_item = {
  name: ty_foodCategory;
  display_name: string;
  menuList: {
    name: string;
    query_name: string;
    display_name: string;
    img: string;
    description: string;
  }[]
}

interface T_get_data_food_menu {
  category: ty_foodCategory;
  item_name: string;
}

type T_menu_list = {
  [key in ty_foodCategory]: ty_menu_list_item
}

export const data_food_menu_list: T_menu_list = {

  'burger': {
    name: 'burger',
    display_name: 'Burgers',
    menuList: [
      {
        name: 'all',
        query_name: '',
        display_name: 'Burgers',
        img: 'burger_all.png',
        description: "At Macca's®, there's a burger for every taste. Explore from our delicious Beef range to our juicy Chicken range."
      },
      {
        name: 'beef',
        query_name: 'beef',
        display_name: 'Beef',
        img: 'burger_beef.png',
        description: "From the Big Mac® to the Classic Angus, enjoy 100% Australian beef for the juiciest, freshest flavours."
      },
      {
        name: 'chicken',
        query_name: 'chicken',
        display_name: 'Chicken',
        img: 'burger_chicken.png',
        description: "At Macca’s we use only 100% Aussie RSPCA Approved chicken. Enjoy our classics or try one of the exciting new additions."
      },
      {
        name: 'mutton',
        query_name: 'mutton',
        display_name: 'Mutton',
        img: 'burger_mutton.png',
        description: "Whether it’s a quick snack, or a meal, we’ve got something for everyone. Discover everything Macca’s has on offer."
      },
      {
        name: 'cheese',
        query_name: 'cheese',
        display_name: 'Cheese',
        img: 'burger_cheese.png',
        description: "That's right, your favourite Macca's® items are now available all day, so you can now enjoy them whenever you feel like it."
      },
      {
        name: 'egg',
        query_name: 'egg',
        display_name: 'Egg',
        img: 'burger_egg.png',
        description: "Wake up to the fresh taste of a Macca’s® breakfast. Quick, easy & a delicious way to start the day."
      },
    ]
  },

  'condiment': {
    name: 'condiment',
    display_name: 'Condiments',
    menuList: [
      {
        name: 'all',
        query_name: '',
        display_name: 'Condiments',
        img: 'condiments_all.png',
        description: "These are the perfect variety of spreads, dressings and sauces. Add one alongside your food for an extra burst of flavour."
      }
    ]
  },


  'drink': {
    name: 'drink',
    display_name: 'Drinks',
    menuList: [
      {
        name: 'all',
        query_name: '',
        display_name: 'Drinks',
        img: 'drinks_all.png',
        description: "Quench your thirst with our delicious range of hot and cold drinks."
      },
      {
        name: 'soft_drinks',
        query_name: 'soft_drinks',
        display_name: 'Soft Drinks',
        img: 'drinks_soft.png',
        description: "Enjoy Cold and Frozen different flavours to find your favourite combo. With different flavours to choose from."
      },
      {
        name: 'coffee',
        query_name: 'coffee',
        display_name: 'Coffee & Tea',
        img: 'drinks_tea_coffee.png',
        description: "McCafé® restaurants during McCafé opening hours. Simply good coffee. Glass for display purposes only. Serving suggestion."
      },
      {
        name: 'milk_shake',
        query_name: 'milk_shake',
        display_name: 'milk Shake',
        img: 'drinks_milk-shake.png',
        description: "McCafé® Coffee fit for an Aussie. Australia, meet the new McCafe® blend. Crafted by expert baristas, just the way you like it."
      }
    ]
  },

  'ice_cream': {
    name: 'ice_cream',
    display_name: 'Ice Creams',
    menuList: [
      {
        name: 'all',
        query_name: '',
        display_name: 'Ice Creams',
        img: 'ice_cream_all.png',
        description: "Indulge in something sweet. As a snack, after dinner or even before."
      }
    ]
  }

};

export const get_data_food_menu = ({ category, item_name }: T_get_data_food_menu): 
  ty_menu_selectedItem|null => {

  const targetFood = data_food_menu_list[category];
  const targetItemIdx = targetFood.menuList.findIndex(el => el.name === item_name);

  if(targetItemIdx < 0) return null;

  const targetItem = targetFood.menuList[targetItemIdx];

  return {
    ...targetItem,
    category,
    index: targetItemIdx,
    item_name: targetItem.name,
  }

}