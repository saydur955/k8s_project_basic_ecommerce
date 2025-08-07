import { FC } from 'react';
import { Typo } from '@/components/shared/typography';
import { ty_menu_foodList_item } from '@/types/food.type';
import { Section } from '@/components/shared/section';
import { FoodListItem } from '../listItem';
import classes from '@/styles/foods/details/relatedItems.module.css';

interface IComp {
  list: ty_menu_foodList_item[]
}

export const RelatedItems: FC<IComp> = ({ list }) => {

  return (
    <Section>

      <Typo txt="You might also like" variant="h3"
        align="center" weight={700}
      />

      <div className={classes.list}>

        {
          list.map(el => (
            <div key={el._id} className={classes.list_item}>
              <FoodListItem item={el} />
            </div>
          ))
        }

      </div>

    </Section>
  )

};