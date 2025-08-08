import { ty_cart_predefine_item, ty_cart_custom_item } from "./cart.type";

export interface ty_order_product_predefine_item extends ty_cart_predefine_item { };

export interface ty_order_product_custom_item extends ty_cart_custom_item { };


export type ty_payment_method = 'paypal' | 'card' | 'bank';

export type ty_order_create_reqBody_foodList_item = {
  total_item: number;
  food_id: string;
} 

// ============================ order one detail ============================

export type ty_order_one_detail_preDefined_item = {
  _id: string;
  name: string;
  image_sm: string;
  food_id: string;
  item_amount: number;
  single_price: number;
}

export type ty_order_one_detail_custom_item = {
  _id: string;
  ingredients: string[];
  item_amount: number;
  single_price: number;
  name: string;
}



export type ty_order_one_detail = {

  _id: string;
  user_id: string;
  total_quantity: number;
  total_price: number;
  paid_amount: number;
  status: string;
  order_at: string;
  deliver_address: string;

  pre_defined: ty_cart_predefine_item[];
  custom: ty_cart_custom_item[];

}
