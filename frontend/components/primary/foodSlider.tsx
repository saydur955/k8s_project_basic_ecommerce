import { useState, FC } from 'react';
import classes from '@/styles/primary/foodSlider.module.css';
import { ty_FoodSummary_item } from '@/types/food.type';
import { NextImage } from '../shared/nextImage';
import { Typo } from '../shared/typography';
import { ButtonSlider } from '../shared/button/button_slider';
import { foodItem_img } from '@/functions/foodItem_img.func';

interface IComp {
  food_list: ty_FoodSummary_item[];
  selected_item_idx: string;
  handleCurrentFoodItem: (idx: number) => void;
  leftHanlder: () => void;
  rightHanlder: () => void;
  currentSliderIndex: number;
}

export const FoodSlider: FC<IComp> = ({ 
  food_list, selected_item_idx, handleCurrentFoodItem, leftHanlder, rightHanlder,
  currentSliderIndex
}) => {

  return (
    <div className={classes.container}>

      <div className={classes.slider}>

        {
          food_list.map((el, idx) => (
            <div key={el.id} className={classes.itemContainer}
              style={{ 
                transform: `translateX(${currentSliderIndex*(-100)}%)`
              }}
            >
              <div className={classes.item}
                onClick={()=> handleCurrentFoodItem(idx)}
              >

                <div  className={classes.item_img}>
                  <img src={el.image} alt={el.name}
                    width={70} height={70}
                  />
                </div>

                <div className={classes.item_name}>
                  <Typo txt={el.name} size="1.5rem" weight={400}
                    color={
                      selected_item_idx === el.id ? 
                      'var(--color_primary)': undefined
                    }
                  />
                </div>
                
              </div>
            </div>
          ))
        }

      </div>

      <ButtonSlider clsName={classes.btn_container}
        leftHanlder={leftHanlder} rightHanlder={rightHanlder}
      />

    </div>
  )


};