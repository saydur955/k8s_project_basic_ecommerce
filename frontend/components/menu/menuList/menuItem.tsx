// module
import { useState, FC } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { menuRouterPathname } from '../../../comp_functions/menu/menuRouterPath';
// comp
import { Typo } from '@/components/shared/typography';
// types
import { ty_menu_list_item } from '../../../data/food_menu_list';
// styles
import classes from '@/styles/menu/menuList.module.css';
import { Icon_Arrow_Up } from '@/components/icons/arrow_up';
import { Icon_Arrow_Down } from '@/components/icons/arrow_down';

interface IComp {
  item: ty_menu_list_item;
}

const checkIsMenuExpended = (pathName: string, currentCategory: string) => {
  if(pathName.split('/')[2] === currentCategory) {
    return true;
  }
  return false;
}

export const MenuItem: FC<IComp> = ({ item }) => {

  const router = useRouter();
  const pathname = usePathname();
  
  const [isMenuExpended, setIsMenuExpended] = useState(
    () => checkIsMenuExpended(pathname, item.name)
  );
  
  const currentPath = pathname.split('/').splice(2, 3).join('-');

  const clickHanlder = (foodItem: string) => {
    router.push(menuRouterPathname(item.name, foodItem));
  }


  const renderItem = () => {

    if(!isMenuExpended) return null;

    return (
      <div className={classes.item_list}>

        {
          item.menuList.map(el => {

            let itemListName = `${item.name}-${el.name}`;
            if(el.name === 'all') {
              itemListName = `${item.name}`;
            }

            return (
              <div key={el.name} className={classes.item_one}
                onClick={()=> clickHanlder(el.name)}
              >
                <Typo txt={el.display_name} variant="h6" weight={400}
                  size="1.8rem" 
                  color={
                    currentPath === itemListName ? 
                    'var(--color_primary)': undefined
                  }
                />
              </div>
            )

          })
        }

      </div>
    )

  }

  return (
    <div className={classes.menuItem_root}>

      <div className={classes.category_title}
        onClick={()=> setIsMenuExpended(!isMenuExpended)}
      >

        <div className={classes.category_txt}>

          <Typo txt={item.display_name.toUpperCase()} variant="h5" 
            weight={400} size="1.4rem"
          />

          {
            isMenuExpended ?
              <Icon_Arrow_Up scale={0.4} />  :
              <Icon_Arrow_Down scale={0.4} />
          }
          
        </div>

        <div className={classes.category_underline}></div>

      </div>

      {renderItem()}

    </div>
  )

};