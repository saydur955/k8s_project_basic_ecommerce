export interface ty_cart_predefine_item {
  food_id: string;
  name: string;
  image: string;
  single_price: number;
  amount: number;
}

export interface ty_cart_custom_item {
  custom_id: string;
  ingredients: string[];
  name: string;
  single_price: number;
  amount: number;
}

export interface ty_cart_list {

  custom_list: {
    [key: string]: ty_cart_custom_item
  };

  predefined_list: {
    [key: string]: ty_cart_predefine_item
  }

}

export type ty_selected_cart_item = { [idx: string]: true }

export interface ty_selected_cart_list {
  custom_list: ty_selected_cart_item,
  predefined_list: ty_selected_cart_item
}