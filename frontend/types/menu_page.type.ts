import { ty_foodCategory } from "./food.type";

export type ty_menu_selectedItem = {
  category: ty_foodCategory;
  index: number;
  item_name: string;
  query_name: string;
  display_name: string;
  img: string;
  description: string;
}