// module
import { FC } from 'react';
import { 
  AmountComp, AmountStaticComp, CancelButtonComp, NameComp, PriceComp, 
  ProductImageComp, SelectComp, get_bg_color 
} from './comp_list';
// type
import { ty_cart_predefine_item } from '../../../types/cart.type';
// style
import classes from '@/styles/foods/cart_item/preDefined.module.css';
import { ty_cart_Context } from '@/context/cartContext';
import { ty_classes } from '@/types/shared.type';


interface IComp {
  item: ty_cart_predefine_item;
  item_idx: number;
  cartCtx?: ty_cart_Context;
  compClass: ty_classes;
}

export const PredefinedItem: FC<IComp> = ({
  item, item_idx, cartCtx, compClass
}) => {



  const nameComp = () => {
    return <NameComp name={item.name} food_id={item.food_id} cls={compClass} />
  }


  const selectComp = () => {

    if(!cartCtx) return null;

    const is_item_selected = cartCtx.selectedList.predefined_list[item.food_id];


    return <SelectComp
      is_item_selected={is_item_selected}
      clickHanlder={() => cartCtx.handle_selected_item({
        type: 'predefined',
        idx: item.food_id
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

  const cancelButtonComp = () => {

    if(!cartCtx) return null;

    return <CancelButtonComp
      clickHanlder={() => cartCtx.remove_predefined_item(item.food_id)}
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

      inputHanlder={(total: number) => cartCtx.update_predefined_item_amount({
        food_id: item.food_id,
        amount: total,
        is_replaced: true
      })}

      increaseHanlder={() => cartCtx.update_predefined_item_amount({
        food_id: item.food_id,
        amount: 1
      })}

      decreaseHanlder={() => cartCtx.update_predefined_item_amount({
        food_id: item.food_id,
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

        <ProductImageComp image={item.image} cls={compClass} />

        {nameComp()}

        {amountComp()}

        {priceComp()}

        {cancelButtonComp()}


      </div>


      {/* ========================= small screen ========================= */}

      <div className={classes.md_screen}>


        <div className={classes.first_line}>

          {selectComp()}

          {nameComp()}

          {cancelButtonComp()}

        </div>

        <div className={classes.second_line}>


          <ProductImageComp image={item.image} cls={compClass} />

          {amountComp()}

          {priceComp()}


        </div>

      </div>


    </div>
  )

};