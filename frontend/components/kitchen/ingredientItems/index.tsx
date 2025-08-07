// module
import { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
// comp
import { IngredientCategory } from './category';
import { IngredientList } from './ingredientList';
// style
import classes from './ingredientItems.module.css';
// types
import { ty_ingredient_category, ty_ingredient_item, ty_ingredient_name }
  from '../../../types/ingredients.blueprint';
// data
import { ingredient_bread_list } from '../../../data/ingredients/bread';
import { ingredient_cheese_list } from '../../../data/ingredients/cheese';
import { ingredient_leaf_list } from '../../../data/ingredients/leaf';
import { ingredient_meat_list } from '../../../data/ingredients/meat';
import { ingredient_vegetable_list } from '../../../data/ingredients/vegetable';
import { get_ingredient_measurement } 
from '../../../comp_functions/kitchen/burgerCanvas/getIngredientList';

interface IComp {
  setSelectedIngredients: Dispatch<SetStateAction<ty_ingredient_name[]>>;
  setIsAddingIngredients: Dispatch<SetStateAction<boolean>>;
  setcanvasHeight: Dispatch<SetStateAction<number>>;
}

export const IngredientItems: FC<IComp> = 
({ setSelectedIngredients, setIsAddingIngredients, setcanvasHeight }) => {

  const [selectdCategory, setSelectedCategory] =
    useState<ty_ingredient_category>('Bread');
  const [currentList, setCurrentList] = useState([...ingredient_bread_list]);

  // ======================= handle current list =======================
  useEffect(() => {

    switch (selectdCategory) {

      case 'Bread':
        setCurrentList([...ingredient_bread_list]);
        break;

      case 'Cheese':
        setCurrentList([...ingredient_cheese_list]);
        break;

      case 'Leaf':
        setCurrentList([...ingredient_leaf_list]);
        break;

      // case 'Masala':
      //   setCurrentList([...ingredient_leaf_list]);
      //   break;

      case 'Meat':
        setCurrentList([...ingredient_meat_list]);
        break;

      case 'Vegetable':
        setCurrentList([...ingredient_vegetable_list]);
        break;

    }


  }, [selectdCategory]);

  const currentIngredietsHandler = (items: ty_ingredient_item) => {

    const itemMeasurement = get_ingredient_measurement(items.name);

    if(!itemMeasurement) return null;

    setSelectedIngredients(prev => [
      ...prev,
      items.name
    ])


    // setcanvasHeight(prev => prev + itemMeasurement.shortenHeight);
    setcanvasHeight(
      prev => 
      prev + itemMeasurement.shortenHeight - itemMeasurement.fadedHeight
    );
    setIsAddingIngredients(true);


  }

  return (
    <div className={classes.root}>

      <div className={classes.main_container}>

        <IngredientCategory
          selectdCategory={selectdCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <IngredientList list={currentList}
          currentIngredietsHandler={currentIngredietsHandler}
        />

      </div>

    </div>
  )

};