import { FC, Dispatch, SetStateAction } from 'react';
import { ty_kitchen_tabMenu } from '@/app/kitchen/page';
import { NextImage } from '../../shared/nextImage';
import classes from './tabMenu.module.css';
import { cls_join } from '@/functions/cls_join.func';
import { IconButton } from '@/components/shared/button/icon_button';

interface IComp {
  currentMenu: ty_kitchen_tabMenu;
  setCurrentMenu: Dispatch<SetStateAction<ty_kitchen_tabMenu>>;
}

export const TabMenu: FC<IComp> = ({ currentMenu, setCurrentMenu }) => {

  const iconTxtComp = (txt: string, isActive: boolean) => {
    return (
      <span className={classes.icon_txt}
        style={{
          color:  isActive ? 'var(--color_primary)' : '#b7b7b7'
        }}
      >
        {txt}
      </span>
    )
  }

  return (
    <div className={classes.tab_menu}>


      <div className={classes.icon_container}>
        <div
          className={
            currentMenu === 'preview' ?
              cls_join([classes.icon, classes.icon_active]) :
              classes.icon
          }
        >
          <IconButton variant="text"
            onClick={() => setCurrentMenu('preview')}
          >
            <NextImage src="/svg/full_screen_lined.svg" alt="preview"
              width={24} height={24} without_placeholder={true}
            />
              {iconTxtComp('Preview', currentMenu === 'preview')}
          </IconButton>
        </div>
      </div>


      <div className={classes.icon_container}>
        <div
          className={
            currentMenu === 'controller' ?
              cls_join([classes.icon, classes.icon_active]) :
              classes.icon
          }
        >
          <IconButton variant="text"
            onClick={() => setCurrentMenu('controller')}
          >
            <NextImage src="/svg/chef.svg" alt="controller"
              width={24} height={24} without_placeholder={true}
            />
              {iconTxtComp('Chef', currentMenu === 'controller')}
          </IconButton>
        </div>
      </div>

    </div>
  )

};