import { FC, ChangeEvent } from "react";
// style
import classes from '@/styles/cart/cartItem.module.css';
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
import { NextImage } from "../shared/nextImage";
import { get_bg_color } from "../foods/cart_item/comp_list";

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
  clsName?: string;
}

interface IStaticTxt {
  txt: number;
  clsName?: string;
}

interface INameComp {
  food_id?: string;
  name: string;
  clsName?: string;
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
  clsName?: string;
}


interface IProductImageComp {
  image: string;
  clsName?: string;
}


const classCenter = (cls: string) => {
  return cls_join([cls, classes.flex_center]);
}

export const PriceComp: FC<IPriceComp> = ({ price, amount, clsName }) => {
  return (
    <div className={cls_join([classCenter(classes.price_container), clsName || ''])}>
      <Typo txt={`৳ ${Math.floor(price * amount)}`}
        size="1.7rem" weight={400} align="center"
      />
    </div>
  )
}

export const StaticTxtComp: FC<IStaticTxt> = ({ txt, clsName }) => {
  return (
    <div className={cls_join([classCenter(classes.price_container), clsName || ''])}>
      <Typo txt={txt}
        size="1.7rem" weight={400} align="center"
      />
    </div>
  )
}


export const NameComp: FC<INameComp> = ({ name, food_id, clsName }) => {

  if (!food_id) {
    return (
      <div className={cls_join([classes.name_container, clsName || ''])}>
        <Typo txt={name} size="1.7rem" weight={400}
          margin="0 0 0 1.2rem"
        />
      </div>
    )
  }

  return (
    <div className={cls_join([classes.name_container, clsName || ''])}>
      <NextLink href={`/foodItem/${food_id}`} >
        <Typo txt={name} size="1.7rem" weight={400}
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
        onClick={increaseHanlder}
      >
        <Icon_Plus scale={0.5} />

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
        onClick={decreaseHanlder}
      >
        <Icon_Minus scale={0.5} />

      </IconButton>

    </div>
  )

}


export const ViewCustomButton: FC<IViewCustomButton> = ({ ingredients, clsName }) => {

  const ingredientStr = convert_ingredients_url(ingredients);

  return (
    <div className={cls_join([classCenter(classes.view_eye_container), clsName || ''])}>
      <NextLink
        href={`/kitchen?${ingredientStr}`}
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



export const ProductImageComp: FC<IProductImageComp> = ({ image, clsName }) => {

  return (
    <div className={cls_join([classCenter(classes.img_container), clsName || ''])}>
      <NextImage src={`/images/food_items/small/${image}`} alt="image"
        width={80} height={80}
      />
    </div>
  )

}