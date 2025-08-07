export type ty_foodCategory = 'burger'| 'drink'| 'ice_cream'| 'condiment';
export type ty_food_ingredients = 'bread';


export interface ty_burger_item {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
}

export interface ty_category_item {
  _id: string;
  name: string;
}

export type ty_FoodSummary_item = {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  image: string;
  description: string;
  size: string;
};

export type ty_FoodSummary_list = {
  _id: string;
  categoryName: string;
  itemList: ty_FoodSummary_item[]
}[];


export interface ty_burger_offer {
  id: string;
  image: string;
  offerTxt: string;
  remainingTime: number;
}

export interface ty_menu_foodList_item {
  _id: string;
  name: string;
  image: string;
  // price: number;
}

export interface ty_food_one_detail {
  id: string;
  name: string;
  category: string;
  item_type?: string;
  price: number;
  size: string;
  image_lg: string;
  image_sm: string;
  discount?: number;
  rating_avg?: number;
  rating_quantity: number;
  review_quantity:  number;
  ingredients: string[]
  subtitle: string;
  description: string;
}

export interface ty_food_one_detail_primaryUI {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  subtitle: string;
  description: string;
}