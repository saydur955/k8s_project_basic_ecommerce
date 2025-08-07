import { useState, FC, Fragment, Dispatch, SetStateAction } from 'react';
// comp
import { NextImage } from '../../shared/nextImage';
import { BurgerEdit } from '../burgerEdit';
import { IngredientItems } from '../ingredientItems';
// types
import { ty_ingredient_name, ty_selected_ingredient_detail } 
from '../../../types/ingredients.blueprint';
import { ButtonSecond } from '@/components/shared/button/button_2';

type TcurrentTab = 'ingredient' | 'editing';

interface IComp {
  selectedIngredientDetail: ty_selected_ingredient_detail[];
  selectedIngredients: ty_ingredient_name[];
  setSelectedIngredients: Dispatch<SetStateAction<ty_ingredient_name[]>>;
  setIsAddingIngredients: Dispatch<SetStateAction<boolean>>;
  setcanvasHeight: Dispatch<SetStateAction<number>>;
}

export const BurgerController: FC<IComp> = ({
  setSelectedIngredients, setIsAddingIngredients, 
  selectedIngredientDetail,
  selectedIngredients, setcanvasHeight
}) => {

  const [currentTab, setCurrentTab] = useState<TcurrentTab>('ingredient');


  return (
    <Fragment>
      {/* <div className={classes.button_container} > */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem',
          marginLeft: '3rem'
        }}
      >

        <ButtonSecond variant={currentTab === 'ingredient' ? 'contained' : 'outlined'}
          Sx={{ marginRight: '1.5rem', padding: '1rem 2rem' }}
          onClick={() => setCurrentTab('ingredient')}
        >
          <NextImage src="/images/kitchen/ingredients.png" alt="ingredients"
            width={20} height={20} without_placeholder={true}
          />
        </ButtonSecond>

        <ButtonSecond variant={currentTab === 'editing' ? 'contained' : 'outlined'}
          Sx={{ marginRight: '1.5rem', padding: '1rem 2rem' }}
          onClick={() => setCurrentTab('editing')}
        >
          <NextImage src="/images/kitchen/edit.png" alt="edit"
            width={20} height={20} without_placeholder={true}
          />
        </ButtonSecond>

      </div>

      {
        currentTab === 'ingredient' ?
          <IngredientItems 
            setSelectedIngredients={setSelectedIngredients}
            setIsAddingIngredients={setIsAddingIngredients}
            setcanvasHeight={setcanvasHeight}
          /> :
          <BurgerEdit
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            setIsAddingIngredients={setIsAddingIngredients}
            setcanvasHeight={setcanvasHeight}
            selectedIngredientDetail={selectedIngredientDetail}
          />
      }
    </Fragment>
  )
};