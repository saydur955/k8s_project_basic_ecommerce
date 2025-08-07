// function
import { get_cart_data } from "./read_write_cart_data";
// types
import { ty_cart_list, ty_cart_predefine_item } from "../../types/cart.type";

export interface ty_update_amount_predefined {
  food_id: string;
  amount: number;
  is_replaced?: boolean;
}

// =========================== add predefined item ===========================
export const add_predefined = (param: ty_cart_predefine_item):
  ty_cart_list | null => {

  if (param.amount < 1) return null;

  // all time get modified data
  let currentCartData = get_cart_data();

  // get current item
  const targetItem = currentCartData.predefined_list[param.food_id];

  const newAmount = targetItem ? targetItem.amount + param.amount : param.amount;

  // if targetItem is not exist
  currentCartData = {
    ...currentCartData,
    predefined_list: {
      ...currentCartData.predefined_list,
      [param.food_id]: {
        ...param,
        amount: newAmount,
      }
    }
  }

  return currentCartData;

}


// =========================== remove predefined item ===========================
export const remove_predefined = (food_id: string): ty_cart_list | null => {

  // all time get modified data
  let currentCartData = get_cart_data();

  // get current item
  const targetItem = currentCartData.predefined_list[food_id];

  // if target item is not exist
  if (!targetItem) return null;

  let newPredefinedList: { [key: string]: ty_cart_predefine_item } = {};

  // remove the target item
  Object.values(currentCartData.predefined_list).forEach(el => {

    if (el.food_id !== food_id) {
      newPredefinedList = {
        ...newPredefinedList,
        [el.food_id]: el
      }
    }

  })

  currentCartData = {
    ...currentCartData,
    predefined_list: { ...newPredefinedList }
  }

  return currentCartData;


}

// =========================== remove predefined item ===========================
export const update_amount_predefined = (param: ty_update_amount_predefined):
  ty_cart_list | null => {

  // all time get modified data
  let currentCartData = get_cart_data();

  // get current item
  const targetItem = currentCartData.predefined_list[param.food_id];

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
    predefined_list: {
      ...currentCartData.predefined_list,
      [targetItem.food_id]: {
        ...targetItem,
        amount: newAmount
      }
    }
  }

  return currentCartData;

}