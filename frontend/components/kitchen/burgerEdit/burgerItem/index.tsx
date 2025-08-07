// module
import { FC, DragEvent } from 'react';
// comp
// types
import { ty_selected_ingredient_detail } 
from '../../../../types/ingredients.blueprint';
// style
import classes from './burgerItem.module.css';
import { NextImage } from '../../../shared/nextImage';
import { Typo } from '@/components/shared/typography';
import { ButtonSecond } from '@/components/shared/button/button_2';

interface IComp {
  item: ty_selected_ingredient_detail;
  customAtribute: string;
  idx: number;
  dragStartHandler: (e: DragEvent<HTMLDivElement>, idx: number) => void;
  removeHanlder: (itemIdx: number) => void;
}

export const BurgerItem: FC<IComp> = 
({ item, customAtribute, idx, dragStartHandler, removeHanlder }) => {

  return (
    <div className={classes.root}
      custom-attribute={customAtribute}
      draggable={true}
      onDragStart={e => dragStartHandler(e, idx)}
    >

      <div className={classes.dataContainer} >

        <div className={classes.image}>
          <NextImage
            src={`/images/ingredients_small${item.img}`} alt={item.display_name}
            width={80} height={item.img_height}
          />
        </div>

        <div className={classes.data}>

          <Typo txt={item.display_name} color="var( --color_black_light)" variant="h4" 
            size="1.6rem" weight={400} margin="0 0 1.2rem 0"
          />

          <Typo txt={`$${item.price}.00`} color="var(--color_orange)" variant="h4"
            size="1.4rem" weight={500} margin="0"
          />

        </div>

      </div>

      <div className={classes.icon_container}>
        <ButtonSecond iconButton={true} variant="text"
          onClick={() => removeHanlder(idx)}
        >
          <NextImage src="/icons/cross.svg" alt="add"
            width={12} height={12} without_placeholder={true}
          />
        </ButtonSecond>
      </div>



    </div>
  )
};