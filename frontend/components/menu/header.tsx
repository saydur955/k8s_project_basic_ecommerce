"use client";
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { data_food_menu_list, ty_menu_list_item } from '../../data/food_menu_list';
import { ty_menu_selectedItem } from '../../types/menu_page.type';
import { NextImage } from '../shared/nextImage';
// style
import { menuRouterPathname } from '../../comp_functions/menu/menuRouterPath';
import { Typo } from '@/components/shared/typography';
import { cls_join } from '@/functions/cls_join.func';
import classes from '@/styles/menu/header.module.css';
import { IconButton } from '../shared/button/icon_button';
import { Icon_Arrow_Left } from '../icons/arrow_left';
import { Icon_Arrow_Right } from '../icons/arrow_right';

interface IComp {
  item: ty_menu_selectedItem
}

export const MenuHeader: FC<IComp> = ({ item }) => {

  const router = useRouter();

  const leftHanlder = () => {

    // get category data
    const categoryData = data_food_menu_list[item.category];

    // check this is not the last item
    if (item.index > 0) {
      const prevItem = categoryData.menuList[item.index - 1];
      router.push(menuRouterPathname(item.category, prevItem.name));
      return null;
    }

    let prevCategoryData: ty_menu_list_item;

    switch (item.category) {

      case 'burger':
        prevCategoryData = data_food_menu_list.ice_cream;
        break;

      case 'condiment':
        prevCategoryData = data_food_menu_list.burger;
        break;

      case 'drink':
        prevCategoryData = data_food_menu_list.condiment;
        break;

      case 'ice_cream':
        prevCategoryData = data_food_menu_list.drink;
        break;

      default:
        prevCategoryData = data_food_menu_list.burger;
        break;
    }

    router.push(
      menuRouterPathname(
        prevCategoryData.name,
        prevCategoryData.menuList[prevCategoryData.menuList.length - 1].name
      )
    );

  }

  const rightHanlder = () => {

    // get category data
    const categoryData = data_food_menu_list[item.category];

    // check this is not the last item
    if (categoryData.menuList.length - 1 !== item.index) {
      const nextItem = categoryData.menuList[item.index + 1];
      router.push(menuRouterPathname(item.category, nextItem.name));
      return null;
    }

    let newCategoryData: ty_menu_list_item;

    switch (item.category) {

      case 'burger':
        newCategoryData = data_food_menu_list.condiment;
        break;

      case 'condiment':
        newCategoryData = data_food_menu_list.drink;
        break;

      case 'drink':
        newCategoryData = data_food_menu_list.ice_cream;
        break;

      case 'ice_cream':
        newCategoryData = data_food_menu_list.burger;
        break;

      default:
        newCategoryData = data_food_menu_list.burger;
        break;
    }

    router.push(
      menuRouterPathname(
        newCategoryData.name,
        newCategoryData.menuList[0].name
      )
    );

  }

  return (
    <div>

      <div className={classes.txtContainer} >

        <div className={classes.txtContent} >

          <Typo txt={item.display_name} variant="h1"
            align="center"
            Sx={{ padding: '0 5rem' }}
          />

          <Typo txt={item.description} align="center"
            size="1.8rem" weight={400} margin="3rem 0 0 0"
          />

          <div>

            <IconButton
              clsName={cls_join([classes.arrow, classes.arrow_left])}
              onClick={leftHanlder}
            >
              <Icon_Arrow_Left />
            </IconButton>


            <IconButton
              clsName={cls_join([classes.arrow, classes.arrow_right])}
              onClick={rightHanlder}
            >
              <Icon_Arrow_Right />
            </IconButton>

          </div>

        </div>

      </div>

      <div className={classes.imgContainer}>

        <NextImage src={`/images/menu/${item.img}`} alt={item.display_name}
          width={750} height={330}
        />

      </div>


    </div>
  )
};

// 1500 * 640