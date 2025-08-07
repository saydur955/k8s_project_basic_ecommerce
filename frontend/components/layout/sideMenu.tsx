"use client";
import { useState, Fragment } from 'react';

import classes from '@/styles/layout/sideMenu.module.css';
import classesLayout from '@/styles/layout/layout.module.css';

import { NextLink } from '../shared/link';
import { NextImage } from '../shared/nextImage';
import { Backdrop } from '../shared/backdrop';
import { IconButton } from '../shared/button/icon_button';

const MENU_LIST: { src: string, href: string }[] = [
  { src: '/nav_icons/home.svg', href: '/' },
  // { src: '/nav_icons/kitchen.svg', href: '/kitchen' },
  { src: '/nav_icons/menu.svg', href: '/menu/burger' },
  { src: '/nav_icons/cart.svg', href: '/cart' },
  { src: '/nav_icons/auth.svg', href: '/auth' },
]

export const SideMenu = () => {

  const [isNavOpen, setIsNavOpen] = useState(false);

  const mainComp = () => {
    return (
      <div className={classes.sideMenuRoot}>

        {
          MENU_LIST.map(el => (
            <div className={classes.menuItem} key={el.src}>
              <NextLink href={el.href} >
                <NextImage src={el.src} height={24} width={24}
                  alt={el.src} without_placeholder={true}
                />
              </NextLink>
            </div>
          ))
        }

      </div>
    )
  }


  return (
    <Fragment>

      {/* ======================= large screen navbar ======================= */}

      <div className={classesLayout.sideMenuContainer_lg} >
        {mainComp()}
      </div>

      {/* ======================= small screen navbar ======================= */}

      <div className={classesLayout.sideMenuContainer_xs} >

        {
          isNavOpen ?
            <Backdrop
              close={() => setIsNavOpen(false)}
              blur={true}
            >

              <div className={classes.container_xs} >
                {mainComp()}
              </div>

            </Backdrop>
            :

            <div className={classes.navContainer}>
              <IconButton variant="text"
                onClick={() => setIsNavOpen(true)}
              >

                <NextImage src="/svg/menu.svg" alt="menu"
                  width={20} height={20} without_placeholder={true}
                />

              </IconButton>
            </div>

        }

      </div>

    </Fragment>
  )


};