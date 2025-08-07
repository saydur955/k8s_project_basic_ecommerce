// module
import { FC, Fragment } from 'react';
import { get_data_food_menu } from '@/data/food_menu_list';
// comp
import { Menu_FoodList } from '@/components/foods/menu/menu_list';
import { MenuHeader } from '@/components/menu/header';
import { MenuList } from '@/components/menu/menuList';
import { Section } from '@/components/shared/section';
// types
import { ty_menu_foodList_item } from '@/types/food.type';
// style
import classes from '@/styles/menu/page.module.css';
import { IconButton } from '@/components/shared/button/icon_button';
import { Icon_Arrow_Left } from '@/components/icons/arrow_left';
import { Icon_Arrow_Right } from '@/components/icons/arrow_right';
import { ty_page_params } from '@/types/general.type';
import { MENU_PAGE_PARAM, MENU_TOTAL_FOOD_COUNT } from './menuData';
import { is_integer } from '@/functions/is_integer.func';
import { Menu_Paginate } from '@/components/foods/menu/paginate';


interface IComp {
  foodData: ty_menu_foodList_item[];
  cat: string;
  subcat?: string;
  param: ty_page_params;
}

export const Menu_RenderComp: FC<IComp> = ({ foodData, cat, subcat, param }) => {

  let currentPage = 1;

  // handle page
  if(
    param.hasOwnProperty(MENU_PAGE_PARAM) && 
    typeof param[MENU_PAGE_PARAM] === 'string' &&
    is_integer(param[MENU_PAGE_PARAM]) &&
    Number(param[MENU_PAGE_PARAM]) > 1
  ) {
    currentPage = Number(param[MENU_PAGE_PARAM])
  }

  // get menu data
  const menuData = get_data_food_menu({
    category: cat as any,
    item_name: subcat ? subcat : 'all'
  });

  if (!menuData) {
    return null;
  }


  return (
    <Fragment>

      <MenuHeader item={menuData} />

      <Section>

        <div className={classes.container} >

          <MenuList />

          <div className={classes.productContainer} >

            <Menu_FoodList list={foodData} />

            {/* =============== paginate button =============== */}
            <Menu_Paginate
              currentPage={currentPage} foodData_count={foodData.length}
            />


          </div>

        </div>

      </Section>

    </Fragment>
  )

};