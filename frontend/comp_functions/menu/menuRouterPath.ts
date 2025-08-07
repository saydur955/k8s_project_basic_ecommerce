import { ty_foodCategory } from "../../types/food.type";

export const menuRouterPathname = (category: ty_foodCategory, item_name: string) => {

  if(item_name === 'all') return `/menu/${category}`;

  return `/menu/${category}/${item_name}`;
}