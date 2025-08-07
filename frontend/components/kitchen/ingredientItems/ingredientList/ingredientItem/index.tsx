// module
import { FC } from 'react';
// comp
import { ty_ingredient_item } 
from '../../../../../types/ingredients.blueprint';
import { NextImage } from '../../../../shared/nextImage';
// types
// style
import classes from './ingredientItem.module.css';
import { ButtonSecond } from '@/components/shared/button/button_2';
import { Typo } from '@/components/shared/typography';

interface IComp {
  item: ty_ingredient_item;
  currentIngredietsHandler: (items: ty_ingredient_item) => void;
}

export const IngredientItem: FC<IComp> = ({ item, currentIngredietsHandler }) => {

  // // render button when typeof items === Array
  // const buttonRender = () => {

  //   if (item.items && item.items.length > 0) {

  //     return (
  //       <div className={classes.item_button_container}>
  //         {
  //           item.items.map((el, idx) => (
  //             <ButtonSecond key={el.name} variant="outlined" size="small"
  //               Sx={{ ...(idx === 0 && { marginBottom: '1rem' }) }}
  //               onClick={() => currentIngredietsHandler({
  //                 ...item,
  //                 name: el.name,
  //                 display_name: `${item.display_name} ${el.display_name}`,
  //                 img: el.img,
  //                 img_height: el.img_height
  //               })}
  //             >
  //               {el.display_name}
  //             </ButtonSecond>
  //           ))
  //         }
  //       </div>
  //     )

  //   }

  //   return (
  //     <ButtonSecond iconButton={true} variant="text"
  //       onClick={()=> currentIngredietsHandler(item)}
  //     >
  //       <NextImage src="/icons/plus.svg" alt="add"
  //         isFixed={true} width={18} height={18}
  //       />
  //     </ButtonSecond>
  //   )

  // }


    // render button when typeof items === Object
    const buttonRender = () => {

      if (item.items) {
  
        return (
          <div className={classes.item_button_container}>
            {
              Object.values(item.items).map((el, idx) => (
                <ButtonSecond key={el.name} variant="outlined" size="small"
                  Sx={{ ...(idx === 0 && { marginBottom: '1rem' }) }}
                  onClick={() => currentIngredietsHandler({
                    ...item,
                    name: el.name,
                    display_name: `${item.display_name} ${el.display_name}`,
                    img: el.img,
                    img_height: el.img_height
                  })}
                >
                  {el.display_name}
                </ButtonSecond>
              ))
            }
          </div>
        )
  
      }
  
      return (
        <ButtonSecond iconButton={true} variant="text"
          onClick={()=> currentIngredietsHandler(item)}
        >
          <NextImage src="/icons/plus.svg" alt="add"
            width={18} height={18} without_placeholder
          />
        </ButtonSecond>
      )
  
    }
  
  return (
    <div className={classes.root}>

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
        {buttonRender()}
      </div>



    </div>
  )
};