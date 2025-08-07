import { FC, ChangeEvent } from "react";
// style
import classes from '@/styles/foods/cart_item/comp_list.module.css';
import { cls_join } from "@/functions/cls_join.func";
import { Typo } from "@/components/shared/typography";
import { NextLink } from "@/components/shared/link";
import { IconButton } from "@/components/shared/button/icon_button";
import { is_integer } from "@/functions/is_integer.func";
import { Icon_Cross_Bold } from "@/components/icons/cross_bold";
import { Icon_Checkbox_Checked } from "@/components/icons/checkbox_checked";
import { Icon_Checkbox_Unchecked } from "@/components/icons/checkbox_uncheck";
import { Icon_Plus } from "@/components/icons/plus";
import { Icon_Minus } from "@/components/icons/minus";
import { convert_ingredients_url } from "@/comp_functions/kitchen/convert_ingredients_url";
import { NextImage } from "@/components/shared/nextImage";
import { is_even } from "@/functions/is_even.func";
import { ty_classes } from "@/types/shared.type";
import { foodItem_img } from "@/functions/foodItem_img.func";

interface ICancelButtonComp {
  clickHanlder: () => void;
}

interface ISelectComp {
  is_item_selected: boolean;
  clickHanlder: () => void;
}

interface IPriceComp {
  price: number;
  amount: number;
  cls: ty_classes;
}

interface IAmountStaticComp {
  amount: number;
  cls: ty_classes;
}

interface INameComp {
  food_id?: string;
  name: string;
  cls: ty_classes;
}

interface IAmountComp {
  inputHanlder: (total: number) => void;
  increaseHanlder: () => void;
  decreaseHanlder: () => void;
  item_idx: number;
  itemAmount: number;
}

interface IViewCustomButton {
  ingredients: string[];
  cls: ty_classes;
}


interface IProductImageComp {
  image: string;
  cls: ty_classes;
}


const classCenter = (cls: string) => {
  return cls_join([cls, classes.flex_center]);
}

export const PriceComp: FC<IPriceComp> = ({ price, amount, cls }) => {
  return (
    <div className={cls_join([classCenter(classes.price_container), cls.price_container])}>
      <Typo txt={`$ ${Math.floor(price * amount)}`}
        size="1.6rem" weight={400} align="center"
      />
    </div>
  )
}


export const AmountStaticComp: FC<IAmountStaticComp> = ({ amount, cls }) => {
  return (
    <div className={cls_join([
      classCenter(classes.amount_static_container), 
      cls.amount_static_container 
      ])}>
      <Typo txt={`X ${amount}`}
        size="1.6rem" weight={400} align="center"
      />
    </div>
  )
}


export const NameComp: FC<INameComp> = ({ name, food_id, cls }) => {

  if (!food_id) {
    return (
      <div className={cls_join([classes.name_container, cls.name_container])}>
        <Typo txt={name} size="1.6rem" weight={400}
          margin="0 0 0 1.2rem"
        />
      </div>
    )
  }

  return (
    <div className={cls_join([classes.name_container, cls.name_container])}>
      <NextLink href={`/foodItem/${food_id}`} >
        <Typo txt={name} size="1.6rem" weight={400}
          margin="0 0 0 1.2rem"
        />
      </NextLink>
    </div>
  )
}


export const CancelButtonComp: FC<ICancelButtonComp> = ({ clickHanlder }) => {
  return (
    <IconButton clsName={classCenter(classes.cross_icon_container)}
      variant="text"
      onClick={clickHanlder}
    >
      <Icon_Cross_Bold scale={0.4} />
    </IconButton>
  )
}

export const SelectComp: FC<ISelectComp> = ({ is_item_selected, clickHanlder }) => {
  return (
    <IconButton
      clsName={classCenter(classes.mark_icon_container)}
      variant="text"
      onClick={clickHanlder}
    >
      {
        is_item_selected ?
          <Icon_Checkbox_Checked scale={0.7} /> :
          <Icon_Checkbox_Unchecked scale={0.7} />
      }

    </IconButton>

  )
}


export const AmountComp: FC<IAmountComp> = ({
  inputHanlder, increaseHanlder, decreaseHanlder, item_idx, itemAmount
}) => {

  const itemInputHanlder = (e: ChangeEvent<HTMLInputElement>) => {

    const newAmount = Number(e.target.value);

    if (is_integer(newAmount) && newAmount >= 0) {
      inputHanlder(newAmount)
    }

  }

  const itemBlurHandler = () => {
    if (itemAmount < 1) {
      inputHanlder(1)
    }
  }

  return (
    <div className={classCenter(classes.amount_container)}>

      <IconButton clsName={classes.amount_container_icon}
        variant="text"
        onClick={decreaseHanlder}
      >
        <Icon_Minus scale={0.5} />

      </IconButton>

      <input type="number"
        // value={itemAmount}
        value={String(itemAmount).replace(/^[0]+/g, "")}
        onChange={itemInputHanlder}
        onBlur={itemBlurHandler}
        className={classes.amount_input}
        style={
          get_bg_color(item_idx)
        }
      />

      <IconButton clsName={classes.amount_container_icon}
        variant="text"
        onClick={increaseHanlder}
      >
        <Icon_Plus scale={0.5} />

      </IconButton>



    </div>
  )

}


export const ViewCustomButton: FC<IViewCustomButton> = ({ ingredients, cls }) => {

  // const ingredientStr = convert_ingredients_url(ingredients);
  const ingredientStr = ingredients.join(',');

  return (
    <div 
    className={cls_join([
      classCenter(classes.view_eye_container), cls.view_eye_container
    ])}
    >
      <NextLink
        href={`/kitchen?ingredients=${ingredientStr}`}
      >
        <IconButton
          variant="text"
        >
          <NextImage src="/svg/view_eye.svg" alt="delete"
            width={24} height={24} without_placeholder={true}
          />
        </IconButton>
      </NextLink>
    </div>
  )
}



export const ProductImageComp: FC<IProductImageComp> = ({ image, cls }) => {

  return (
    <div className={cls_join([classCenter(classes.img_container), cls.img_container])}>
      <NextImage 
        // src={`/images/food_items/small/${image}`} 
        src={foodItem_img({ src: image, size: 'sm' })} 
        alt="image"
        width={80} height={80}
      />
    </div>
  )

}


export const get_bg_color = (idx: number) => {
  return {
    backgroundColor: is_even(idx) ? 'var(--color_white)' : '#f4f6fa'
  }
}