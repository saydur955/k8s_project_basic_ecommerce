"use client";
import { FC } from 'react';
import { Icon_Arrow_Left } from '@/components/icons/arrow_left';
import { Icon_Arrow_Right } from '@/components/icons/arrow_right';
import { IconButton } from '@/components/shared/button/icon_button';
import { MENU_PAGE_PARAM, MENU_TOTAL_FOOD_COUNT } from '@/page_template/menu/menuData';
import classes from '@/styles/menu/paginate.module.css';
import { useSetURL } from '@/hooks/useSetURL';

interface IComp {
  currentPage: number;
  foodData_count: number;
}

export const Menu_Paginate: FC<IComp> = ({ currentPage, foodData_count }) => {

  const { set_param } = useSetURL();

  return (
    <div className={classes.root}>

      <div className={classes.btn_container}>


        <IconButton 
          disabled={currentPage === 1}
          onClick={()=> set_param({ name: MENU_PAGE_PARAM, value: currentPage-1  })}
        >
          <Icon_Arrow_Left scale={0.7}
            fill={currentPage === 1 ? '#A0A0A0' : '#000'}
          />
        </IconButton>

        <IconButton
          disabled={foodData_count < MENU_TOTAL_FOOD_COUNT}
          onClick={()=> set_param({ name: MENU_PAGE_PARAM, value: currentPage+1  })}
        >
          <Icon_Arrow_Right scale={0.7}
            fill={foodData_count < MENU_TOTAL_FOOD_COUNT ? '#A0A0A0' : '#000'}
          />
        </IconButton>

      </div>

    </div>
  )

};