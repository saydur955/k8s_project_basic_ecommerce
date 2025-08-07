import { FC } from 'react';
import { ty_cart_Context } from '@/context/cartContext';
import { ty_cart_predefine_item, ty_cart_custom_item } from '@/types/cart.type';
import { PredefinedItem } from './preDefined';
import { CustomItem } from './custom';
import { ty_classes } from '@/types/shared.type';

interface IComp {
  type: 'order' | 'cart';
  item_idx: number;
  predefine_item?: ty_cart_predefine_item;
  custom_item?: ty_cart_custom_item;
  cartCtx?: ty_cart_Context;
  compClass: ty_classes;
}

export const Cart_Item: FC<IComp> = ({
  type, predefine_item, custom_item, cartCtx, item_idx, compClass
}) => {

  if (predefine_item) {

    return <PredefinedItem
      item={predefine_item}
      item_idx={item_idx}
      cartCtx={cartCtx}
      compClass={compClass}
    />

  }

  if (custom_item) {
    return <CustomItem
      item={custom_item}
      item_idx={item_idx}
      cartCtx={cartCtx}
      compClass={compClass}
    />
  }

  return (
    <div>index</div>
  )

};