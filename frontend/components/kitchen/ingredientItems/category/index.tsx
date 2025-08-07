// module
import { FC, Dispatch, SetStateAction } from 'react';
// data
import { ingredientCategoryList } from '../../../../data/ingredientCategory';
// comp
import { ty_ingredient_category } from '../../../../types/ingredients.blueprint';
import { NextImage } from '../../../shared/nextImage';
// styles
import classes from './category.module.css';
import { Typo } from '@/components/shared/typography';

interface IComp {
  selectdCategory: ty_ingredient_category;
  setSelectedCategory: Dispatch<SetStateAction<ty_ingredient_category>>
}

export const IngredientCategory: FC<IComp> = 
({ selectdCategory, setSelectedCategory }) => {

  const renderCatItem = () => {
    return ingredientCategoryList.map(el => {

      const isCurrentItem = selectdCategory === el.name;

      return (
        <div key={el.name}
          className={classes.item}
          onClick={()=> setSelectedCategory(el.name)}
          style={{
            borderColor: isCurrentItem ? 'var(--color_orange)': 
              'var(--color_white)',
            backgroundColor:  isCurrentItem ? 'var(--color_orange)': 
              'var(--color_white)'
          }}
        >
            <NextImage
              src={el.img} alt={el.name}
              width={60} height={60}
              clsName={classes.item_image}
              Sx={{
                padding: '0.8rem',
                backgroundColor: 'var(--color_white)',
                borderRadius: '50%',
                border: '0.1rem solid var(--color_white)'
              }}
            />

            <Typo txt={el.name} size="1.2rem" margin="1.5rem 0 0.5rem 0" weight={500}
              color={isCurrentItem ? 'var(--color_white)': '#000'}
            />

        </div>
      )

    })
  }

  return (
    <div style={{marginTop: '2rem'}} >

      <div className={classes.itemContainer} >

        {renderCatItem()}

      </div>

    </div>
  )
  
};







// export const IngredientCategory = () => {

//   const renderComp = () => {
//     return ingredientCategory.map(el => (
//       <div key={el.name}>
//         <NextImage src={el.img} alt={el.name} />
//       </div>
//     ))
//   }

//   return (
//     <div>
//       {renderComp()}
//     </div>
//   )

// };