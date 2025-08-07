import { FC, Dispatch, SetStateAction } from 'react';
// classes
import classes from './ingredientList.module.css';
// types
import { ty_ingredient_name, ty_ingredient_item } 
from '../../../../types/ingredients.blueprint';
import { IngredientItem } from './ingredientItem';

interface IComp {
  list: ty_ingredient_item[];
  currentIngredietsHandler: (items: ty_ingredient_item) => void;
}

export const IngredientList: FC<IComp> = ({ list, currentIngredietsHandler }) => {

  return (
    <div className={classes.item_list}>

      {
        list.map(el => (
          <IngredientItem key={el.name} item={el}
            currentIngredietsHandler={currentIngredietsHandler}
          />
        ))
      }

    </div>
  )

}