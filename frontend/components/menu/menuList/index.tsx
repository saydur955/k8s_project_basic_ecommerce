"use client";
// module
import { Fragment, useState } from 'react';
// comp
import { MenuItem } from './menuItem';
// styles
import classes from '@/styles/menu/menuList.module.css';
import classMain from '@/styles/menu/page.module.css';
// data
import { data_food_menu_list } from '../../../data/food_menu_list';
import { MenuIcon } from '../menuIcon';
import { Backdrop } from '../../shared/backdrop';
import { Typo } from '@/components/shared/typography';


export const MenuList = () => {

  const [isXsMenuOpen, setIsXsMenuOpen] = useState(false);

  const mainComp = () => {

    return (
      <div className={classes.menuList_root} >
  
        <Typo txt="Menu" variant="h2" color="#2d2d2d"
          margin="0 0 3rem 0"
        />
  
        <MenuItem item={data_food_menu_list['burger']}  />
        <MenuItem item={data_food_menu_list['condiment']} />
        <MenuItem item={data_food_menu_list['drink']} />
        <MenuItem item={data_food_menu_list['ice_cream']} />
        
      </div>
    )

  }

  return (
    <Fragment>

      <div className={classMain.menuContainer_lg} >
        {mainComp()}
      </div>

      <div className={classMain.menuContainer_sm}>

        {
          isXsMenuOpen ?
          <Backdrop
            blur={true}
            close={()=> setIsXsMenuOpen(false)}
          >
            <div className={classes.backdrop_container}>
              {mainComp()}
            </div>

          </Backdrop> :
          <MenuIcon clickHanlder={()=> setIsXsMenuOpen(true)} />
        }


      </div>

    </Fragment>
  )

};