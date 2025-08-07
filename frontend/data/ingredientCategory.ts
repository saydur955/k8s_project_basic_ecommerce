import { ty_ingredient_category } from "../types/ingredients.blueprint";

type T_category_item = {
  name: ty_ingredient_category;
  img: string;
}

export const ingredientCategoryList: T_category_item[] = [
  {
    name: 'Bread',
    img: '/images/ingredient_category/bread.png'
  },
  {
    name: 'Meat',
    img: '/images/ingredient_category/meat.png'
  },
  {
    name: 'Vegetable',
    img: '/images/ingredient_category/vegetable.png'
  },
  {
    name: 'Cheese',
    img: '/images/ingredient_category/cheese.png'
  },
  {
    name: 'Leaf',
    img: '/images/ingredient_category/leaf.png'
  },
  // {
  //   name: 'Masala',
  //   img: '/images/ingredient_category/garlic.png'
  // },
]