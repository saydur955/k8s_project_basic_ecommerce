import { FC } from 'react';
// types
import { ty_menu_foodList_item } from '../../types/food.type';
import { NextImage } from '../shared/nextImage';
import { NextLink } from '@/components/shared/link';
import { Typo } from '@/components/shared/typography';
// styles
import classes from '@/styles/foods/listItem.module.css';
import { foodItem_img } from '@/functions/foodItem_img.func';

interface IComp {
  item: ty_menu_foodList_item;
}

export const FoodListItem: FC<IComp> = ({ item }) => {

  let food_url = 
  `/foods/${item._id}/${item.name.toLowerCase().split(' ').join('-')}`;

  return (
    <div className={classes.root}>
      <NextLink href={food_url} clsName={classes.root_link}>

        <div className={classes.container}>

          <div className={classes.imgContainer}>

            <img src={item.image} alt={item.name}
              style={{ width: 260, height: 260 }}
            />

          </div>

          <div className={classes.txtContainer}>
            <Typo txt={item.name} size="1.8rem" weight={400}
              margin="0" align="center"
            />
          </div>

        </div>
      </NextLink>
    </div>
  )
};