
// ==================== How data will be saved on firestore ====================

import { ty_foodCategory, ty_food_ingredients } from "./food.type";

export interface ty_FoodItem_db {
  name: string;
  category: ty_foodCategory;
  price: number;
  discount: number;
  image_sm: string;
  item_type: string;
}

export interface ty_FoodItem_detail_db {
  image_lg: string;
  rating_avg: number|null,
  rating_quantity: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  },
  ingredients: ty_food_ingredients[];
  availibility: boolean;
}

export interface ty_FoodItem_Summary_db {
  id: string; // id of food item doc
  name: string;
  price: number;
  discount: number;
  image: string;
}

export interface ty_Food_Offer_Summary_db {
  id: string; // id of offer collection
  image: string;
  offerTxt: string;
  remainingTime: number;
}

export interface ty_FoodItem_local extends ty_FoodItem_detail_db {
  id: string;
  category: ty_foodCategory;
  name: string;
  price: number;
  discount: number;
  image_sm: string;
  local_image: string;
  item_type: string;
}