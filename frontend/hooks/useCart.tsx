// module
import { useEffect, useState } from 'react';
// cart function
import { get_cart_data, set_cart_data }
  from '../comp_functions/cart/read_write_cart_data';
import {
  add_predefined,
  remove_predefined,
  update_amount_predefined, ty_update_amount_predefined
} from '../comp_functions/cart/handle_predefined_item';
import {
  add_custom,
  remove_custom,
  update_amount_custom, ty_update_amount_custom, ty_add_cart_custom_item
} from '../comp_functions/cart/handle_custom_item';

import { ty_fetch_status } from '../types/shared.type';
import { ty_cart_list, ty_selected_cart_list, ty_selected_cart_item, ty_cart_predefine_item } 
from '../types/cart.type';


export interface ty_handle_selected_item {
  type: 'predefined' | 'custom'
  idx: string;
}


export const useCart = () => {

  const [status, setStatus] = useState<ty_fetch_status>('loading');


  const [cartList, setCartList] = useState<ty_cart_list>({
    predefined_list: {},
    custom_list: {}
  });

  const [selectedList, setSelectedList] = useState<ty_selected_cart_list>({
    predefined_list: {},
    custom_list: {}
  });

  useEffect(() => {

    const cartData = get_cart_data();

    setCartList({ ...cartData });
    setStatus('success');

  }, []);

  // =========================== add on local storage ===========================
  useEffect(() => {

    if (status === 'success') {
      set_cart_data(cartList);
    }


  }, [status, cartList]);


  const select_all_items = () => {

    let selectedCustom: ty_selected_cart_item = {};
    let selectedPredefined: ty_selected_cart_item = {};

    Object.keys(cartList.custom_list).forEach(el => {
      selectedCustom = {
        ...selectedCustom,
        [el]: true
      }
    });

    Object.keys(cartList.predefined_list).forEach(el => {
      selectedPredefined = {
        ...selectedPredefined,
        [el]: true
      }
    });

    setSelectedList({
      predefined_list: {...selectedPredefined},
      custom_list: {...selectedCustom}
    });

  }

  // =========================== handle predefined ===========================

  // add predefined item
  const add_predefined_item = (param: ty_cart_predefine_item) => {
    const newCartData = add_predefined(param);
    if (!newCartData) return null;
    setCartList({ ...newCartData });
  }


  // remove predefined item
  const remove_predefined_item = (food_id: string): any => {
    const newCartData = remove_predefined(food_id);
    if (!newCartData) return null;
    setCartList({ ...newCartData });
  }

  // update predefined item amount
  const update_predefined_item_amount = (param: ty_update_amount_predefined): any => {
    const newCartData = update_amount_predefined(param);
    if (!newCartData) return null;
    setCartList({ ...newCartData });
  }

  // =========================== handle custom ===========================

  // add custom item
  const add_custom_item = (param: ty_add_cart_custom_item) => {
    const newCartData = add_custom(param);
    if (!newCartData) return null;
    setCartList({ ...newCartData });
  }

  // remove custom item
  const remove_custom_item = (item_idx: string): any => {
    const newCartData = remove_custom(item_idx);
    if (!newCartData) return null;
    setCartList({ ...newCartData });
  }

  // update predefined item amount
  const update_custom_item_amount = (param: ty_update_amount_custom): any => {
    const newCartData = update_amount_custom(param);
    if (!newCartData) return null;
    setCartList({ ...newCartData });
  }

  // check one item on the cartList
  const check_item_on_cartList = (food_id: string): boolean => {

    const getCartList = get_cart_data();
    const isItemExist = getCartList.predefined_list[food_id];

    if(isItemExist) return true;
    return false;
  }

  // =========================== handle selected item ===========================
  const handle_selected_item = (param: ty_handle_selected_item): any => {

    let prevList = { ...selectedList };

    // ---------------------- hanlde custom_list ----------------------
    if (param.type === 'custom') {

      if (prevList.custom_list.hasOwnProperty(param.idx)) {
        // if item is already exist, then remove it

        let newCustomList: ty_selected_cart_item = {};

        Object.keys(prevList.custom_list).forEach(el => {
          if (el !== param.idx) {
            newCustomList = {
              ...newCustomList,
              [el]: true
            }
          }
        })

        prevList = {
          ...prevList,
          custom_list: {
            ...newCustomList
          }
        }

      }
      else {
        // if item is not exist, then add it
        prevList = {
          ...prevList,
          custom_list: {
            ...prevList.custom_list,
            [param.idx]: true
          }
        }
      }

    }
    // ---------------------- hanlde predefined_list ----------------------
    else {

      if (prevList.predefined_list.hasOwnProperty(param.idx)) {
        // if item is already exist, then remove it

        let newPredefineList: ty_selected_cart_item = {};

        Object.keys(prevList.predefined_list).forEach(el => {
          if (el !== param.idx) {
            newPredefineList = {
              ...newPredefineList,
              [el]: true
            }
          }
        })

        prevList = {
          ...prevList,
          predefined_list: {
            ...newPredefineList
          }
        }

      }
      else {
        // if item is not exist, then add it
        prevList = {
          ...prevList,
          predefined_list: {
            ...prevList.predefined_list,
            [param.idx]: true
          }
        }
      }

    }

    setSelectedList({ ...prevList });

  }



  return {
    status, cartList, selectedList, select_all_items,
    add_predefined_item, remove_predefined_item, update_predefined_item_amount,
    add_custom_item, remove_custom_item, update_custom_item_amount,
    handle_selected_item,
    check_item_on_cartList
  }

};