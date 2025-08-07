// module
import { FC } from 'react';
// comp
import { NextImage } from '../../shared/nextImage';
// utils
// style
import classes from '@/styles/foods/cart_item/custom.module.css';
// type
import { ty_cart_custom_item } from '../../../types/cart.type';
import { AmountComp, AmountStaticComp, CancelButtonComp, NameComp, PriceComp, SelectComp, ViewCustomButton, get_bg_color }
  from './comp_list';
import { cls_join } from '@/functions/cls_join.func';
import { NextLink } from '@/components/shared/link';
import { convert_ingredients_url } from '@/comp_functions/kitchen/convert_ingredients_url';
import { ty_cart_Context } from '@/context/cartContext';
import { ty_classes } from '@/types/shared.type';

interface IComp {
  item: ty_cart_custom_item;
  item_idx: number;
  cartCtx?: ty_cart_Context;
  compClass: ty_classes;
}


export const CustomItem: FC<IComp> = ({
  item, item_idx, cartCtx, compClass
}) => {


  const classCenter = (cls: string) => {
    return cls_join([cls, classes.flex_center]);
  }

  const nameComp = () => {
    return <NameComp name={item.name} cls={compClass} />
  }

  const selectComp = () => {

    if(!cartCtx) return null;

    const is_item_selected = cartCtx.selectedList.custom_list[item_idx];


    return <SelectComp
      is_item_selected={is_item_selected}
      clickHanlder={() => cartCtx.handle_selected_item({
        type: 'custom',
        idx: item_idx.toString()
      })}
    />
  }

  const priceComp = () => {
    return <PriceComp
      price={item.single_price}
      amount={item.amount}
      cls={compClass}
    />
  }

  const viewButtonComp = () => {

    return <ViewCustomButton 
      ingredients={item.ingredients} cls={compClass} 
    />

  }


  const cancelButtonComp = () => {

    if(!cartCtx) return null;

    return <CancelButtonComp
      clickHanlder={() => cartCtx.remove_custom_item(item.custom_id)}
    />
  }

  const amountComp = () => {

    if(!cartCtx) {
      return (
        <AmountStaticComp
          amount={item.amount} cls={compClass}
        />
      )
    }


    return <AmountComp
      item_idx={item_idx}
      itemAmount={item.amount}

      inputHanlder={(total: number) => cartCtx.update_custom_item_amount({
        item_id: item.custom_id,
        amount: total,
        is_replaced: true
      })}

      increaseHanlder={() => cartCtx.update_custom_item_amount({
        item_id: item.custom_id,
        amount: 1
      })}

      decreaseHanlder={() => cartCtx.update_custom_item_amount({
        item_id: item.custom_id,
        amount: -1
      })}

    />
  }


  return (
    <div className={classes.root}
      style={
        get_bg_color(item_idx)
      }
    >

      {/* ========================= medium to wide screen ========================= */}
      <div className={classes.lg_screen}>

        {selectComp()}

        {nameComp()}

        {viewButtonComp()}

        {amountComp()}

        {priceComp()}

        {cancelButtonComp()}


      </div>



      {/* ========================= md screen ========================= */}

      <div className={classes.md_screen}>

        <div className={classes.first_line}>

          {selectComp()}

          {nameComp()}

          {cancelButtonComp()}


        </div>

        <div className={classes.second_line}>

          {viewButtonComp()}

          {amountComp()}

          {priceComp()}

        </div>


      </div>


    </div>
  )

};