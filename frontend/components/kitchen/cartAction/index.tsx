import { useState, FC, Dispatch, SetStateAction, Fragment } from 'react';
import classes from './cartAction.module.css';
import { Typo } from '@/components/shared/typography';
import { TextField } from '@/components/shared/text_field';
import { Button } from '@/components/shared/button/button';
import { SnackBar, ty_snackbar_type } from '@/components/shared/snackbar';
import { ty_ingredient_name } from '@/types/ingredients.blueprint';
import { ty_add_cart_custom_item } from '@/comp_functions/cart/handle_custom_item';

interface IComp {
  price: number;
  selectedIngredients: ty_ingredient_name[];
  add_custom_item: (param: ty_add_cart_custom_item) => null | undefined;
}

interface T_cartMsg {
  type: ty_snackbar_type;
  msg: string;
}

export const KitchenCartAction: FC<IComp> = ({
  price, selectedIngredients, add_custom_item
}) => {

  const [cartMsg, setCartMsg] = useState<T_cartMsg | null>(null);
  const [burgerName, setBurgerName] = useState('');


  // ========== cart add hanlder 
  const cartAddHanlder = () => {

    if (selectedIngredients.length === 0) {
      setCartMsg({
        msg: 'No Ingredients added',
        type: 'error'
      });
      return null;
    }

    if (!burgerName) {
      setCartMsg({
        msg: 'Burger Name required',
        type: 'error'
      });
      return null;
    }

    add_custom_item({
      ingredients: selectedIngredients,
      single_price: price,
      name: burgerName
    });

    setCartMsg({
      msg: 'Burger added on Cart',
      type: 'success'
    });

  }

  return (
    <Fragment>

      {
        cartMsg &&
        <SnackBar
          isOpen={true}
          message={cartMsg.msg}
          type={cartMsg.type}
          closeHandler={() => setCartMsg(null)}
        />
      }

      <div className={classes.root}>

        <div className={classes.content}>
          <Typo txt="Price" variant="h2" weight={500} margin="0 3rem 0 0" />
          <Typo txt={`${price}$`} variant="h2" weight={400} margin="0"
            color='var(--color_primary)'
          />
        </div>

        <div className={classes.name_input}>
          <TextField label='Prefered Name' value={burgerName} changeHandler={setBurgerName} />
        </div>

        <div className={classes.btnContainer} >
          <Button txt="Add to Cart" isFullWidth={true}
            onClick={cartAddHanlder}
          />
        </div>

      </div>
    </Fragment>
  )

};