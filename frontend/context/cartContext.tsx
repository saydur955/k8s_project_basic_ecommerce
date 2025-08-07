import { createContext, FC, ReactNode } from 'react';
import { ty_handle_selected_item, useCart } from '@/hooks/useCart';
import { ty_cart_list, ty_cart_predefine_item, ty_selected_cart_list } from '@/types/cart.type';
import { ty_fetch_status } from '@/types/general.type';
import { ty_update_amount_predefined } 
from '@/comp_functions/cart/handle_predefined_item';
import { ty_add_cart_custom_item, ty_update_amount_custom } 
from '@/comp_functions/cart/handle_custom_item';


export interface ty_cart_Context {
  status: ty_fetch_status;

  cartList: ty_cart_list;
  selectedList: ty_selected_cart_list;
  select_all_items: () => void;

  add_predefined_item: (param: ty_cart_predefine_item) => any;
  remove_predefined_item: (food_id: string) => any;
  update_predefined_item_amount: (param: ty_update_amount_predefined) => any;
  

  add_custom_item: (param: ty_add_cart_custom_item) => any;
  remove_custom_item: (item_idx: string) => any;
  update_custom_item_amount: (param: ty_update_amount_custom) => any;


  check_item_on_cartList: (food_id: string) => boolean;
  handle_selected_item: (param: ty_handle_selected_item) => any;

};

interface IComp {
  children: ReactNode
}


// cart context
export const CartContext = createContext<ty_cart_Context>({

  status: 'loading',

  cartList: {    
    predefined_list: {},
    custom_list: {}
  },
  selectedList: {    
    predefined_list: {},
    custom_list: {}
  },
  select_all_items: () => {},

  add_predefined_item: () => {},
  remove_predefined_item: () => {},
  update_predefined_item_amount: () => {},
  

  add_custom_item: () => {},
  remove_custom_item: () => {},
  update_custom_item_amount: () => {},


  check_item_on_cartList: () => false,
  handle_selected_item: () => {}

});


// cart context provider
export const CartProvider: FC<IComp> = ({children}) => {

  const { 
    status, cartList, selectedList, select_all_items,
    add_predefined_item, remove_predefined_item, update_predefined_item_amount,
    add_custom_item, remove_custom_item, update_custom_item_amount,
    handle_selected_item,
    check_item_on_cartList
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        status, cartList, selectedList, select_all_items,
        add_predefined_item, remove_predefined_item, update_predefined_item_amount,
        add_custom_item, remove_custom_item, update_custom_item_amount,
        handle_selected_item,
        check_item_on_cartList
      }}>
      {children}
    </CartContext.Provider>
  )

}