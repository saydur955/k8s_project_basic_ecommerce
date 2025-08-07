import { is_server } from "@/functions/is_server.func";
import { ty_cart_list } from "../../types/cart.type";

const CART_KEY = 'burger_shop_cart';

// const default_data: ty_cart_list = {

//   custom_list: {

//     '1': {
//       custom_id: '1',
//       ingredients: ['bread_white_bun_top', 'meat_beef', 'bread_white_bun_bottom'],
//       name: 'test burger with cheese, beef, chicken',
//       price: 250,
//       amount: 2
//     },

//     '0': {
//       custom_id: '0',
//       ingredients: [
//         'bread_seeded_bun_bottom', 
//         'leaf_lettuce', 
//         'vegetable_onion', 
//         'meat_beef', 
//         'bread_seeded_bun_top'
//       ],
//       name: 'meat heaven!! beef, mutton, chicken, duck burger',
//       price: 500,
//       amount: 1
//     },

//   },

//   predefined_list: {

//     'item_01': {
//       food_id: 'item_01',
//       name: 'Butter Chicken Grilled Burger',
//       image: 'big-mac.png',
//       price: 250,
//       amount: 2
//     },

//     'item_02': {
//       food_id: 'item_02',
//       name: 'Butter Chicken Grilled Burger',
//       image: 'butter_chicken_grilled.png',
//       price: 140,
//       amount: 1
//     },

//     'item_03': {
//       food_id: 'item_03',
//       name: 'Caesar Chicken Burger',
//       image: 'caesar-chicken.png',
//       price: 300,
//       amount: 4
//     },

//   }
// }

const default_data: ty_cart_list = {
  custom_list: {},
  predefined_list: {}
}

export const get_cart_data = (): ty_cart_list => {

  if(is_server) return default_data;

  // get from local storage
  const getData = localStorage.getItem(CART_KEY);

  if(!getData) return default_data;

  return JSON.parse(getData);

}


export const set_cart_data = (cartData: ty_cart_list) => {

  if(is_server) return null;

  localStorage.setItem(CART_KEY, JSON.stringify(cartData));

}

