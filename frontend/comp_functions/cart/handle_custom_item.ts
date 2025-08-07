// function
import { get_cart_data } from "./read_write_cart_data";
// types
import { ty_cart_custom_item, ty_cart_list } from "../../types/cart.type";

// export interface ty_add_cart_custom_item extends ty_car {
//   ingredients: string[];
//   name: string;
//   price: number;
// }

export interface ty_add_cart_custom_item extends Omit<
ty_cart_custom_item, 'custom_id'| 'amount'> {}


export interface ty_update_amount_custom {
  item_id: string;
  amount: number;
  is_replaced?: boolean;
}

// =========================== add custom item ===========================
export const add_custom = (param: ty_add_cart_custom_item):
  ty_cart_list | null => {

  // all time get modified data
  let currentCartData = get_cart_data();

  
  const newKey = Object.keys(currentCartData.custom_list).length;

  currentCartData = {
    ...currentCartData,
    custom_list: {
      ...currentCartData.custom_list,
      [newKey]: {
        ...param,
        custom_id: newKey,
        amount: 1,
        // single_price: param.price
      }
    }
  }

  return currentCartData;

}


// =========================== remove predefined item ===========================
export const remove_custom = (item_id: string): ty_cart_list | null => {


  // all time get modified data
  let currentCartData = get_cart_data();

  // get current item
  const targetItem = currentCartData.custom_list[item_id];

  // if target item is not exist
  if (!targetItem) return null;

  let newCustomList: { [key: string]: ty_cart_custom_item } = {};

  // remove the target item
  Object.values(currentCartData.custom_list).forEach(el => {

    if (el.custom_id !== item_id) {
      newCustomList = {
        ...newCustomList,
        [el.custom_id]: el
      }
    }

  })


  currentCartData = {
    ...currentCartData,
    custom_list: { ...newCustomList }
  }

  return currentCartData;

}

// =========================== remove predefined item ===========================
export const update_amount_custom = (param: ty_update_amount_custom):
  ty_cart_list | null => {

  // all time get modified data
  let currentCartData = get_cart_data();

  // get current item
  const targetItem = currentCartData.custom_list[param.item_id];

  // if target item is not exist
  if (!targetItem) return null;

  let newAmount: number;

  if(param.is_replaced) {
    newAmount = param.amount;
    if(newAmount < 0) return null; // so that user can type 0 on the input filed
  }
  else {
    newAmount = targetItem.amount + param.amount;
    if(newAmount < 1) return null;
  }


  currentCartData = {
    ...currentCartData,
    custom_list: {
      ...currentCartData.custom_list,
      [targetItem.custom_id]: {
        ...targetItem,
        amount: newAmount
      }
    }
  }

  return currentCartData;

}