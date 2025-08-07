import { FC } from 'react';
// types
// styles
import { FoodListItem } from '../listItem';
import { ty_menu_foodList_item } from '@/types/food.type';
import classes from '@/styles/foods/menu_list.module.css';

interface IComp {
  list: ty_menu_foodList_item[];
}

export const Menu_FoodList: FC<IComp> = ({ list }) => {
  return (
    <div className={classes.food_list}>
      {
        list.map(el => (
          <div key={el._id} className={classes.list_item}>
            <FoodListItem item={el} />
          </div>
        ))
      }
    </div>
  )
};