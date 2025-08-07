"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
// hooks
import { useCart } from '@/hooks/useCart';
// comp
import { BurgerCanvas } from '@/components/kitchen/burgerCanvas';
import { BurgerController } from '@/components/kitchen/burgerController';
import { TabMenu } from '@/components/kitchen/tabMenu';
import { get_ingredient_details_list } 
from '@/comp_functions/kitchen/get_ingredient_detail';
import { KitchenCartAction } from '@/components/kitchen/cartAction';
// styles
import classes from '@/styles/kitchen.module.css';
// types
import { ty_ingredient_name, ty_selected_ingredient_detail } 
from '@/types/ingredients.blueprint';

export type ty_kitchen_tabMenu = 'preview' | 'controller'

interface T_ingredient_detail {
  detailList: ty_selected_ingredient_detail[];
  price: number;
}



export default function KitchenPage () {

  const [canvasHeight, setcanvasHeight] = useState(350);

  const [selectedIngredients, setSelectedIngredients] =
    useState<ty_ingredient_name[]>([]);

  const [isAddingIngredients, setIsAddingIngredients] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<ty_kitchen_tabMenu>('controller');

  const [selectedIngredientDetail, setSelectedIngredientDetail] = 
  useState<T_ingredient_detail>({
    detailList: [],
    price: 0
  });


  const searchParams = useSearchParams();
  const { add_custom_item } = useCart();


  useEffect(() => {

    let query_ingredients = null;


    const ingredients_param = searchParams.get('ingredients');

    if(ingredients_param) {
      query_ingredients = ingredients_param.split(',');
    }

    // const query_ingredients = router.query.ingredient;

    if (query_ingredients && Array.isArray(query_ingredients)) {
      setSelectedIngredients([...query_ingredients] as any);
    }

  }, [searchParams]);


  useEffect(() => {

    const newIngreDetail = get_ingredient_details_list(selectedIngredients);

    setSelectedIngredientDetail({...newIngreDetail});

  }, [selectedIngredients]);


  const canvasComp = () => {
    return (
      <div className={classes.canvasContainer}>
        <BurgerCanvas 
          canvasHeight={canvasHeight}
          ingredientList={selectedIngredients}
          isAddingIngredients={isAddingIngredients}
        />
      </div>
    )
  }

  const controllerComp = () => {
    return (
      <div className={classes.controllerContainer}>
        <BurgerController
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          setIsAddingIngredients={setIsAddingIngredients}
          setcanvasHeight={setcanvasHeight}
          selectedIngredientDetail={selectedIngredientDetail.detailList}
        />
      </div>
    )
  }

  return (
    <div className={classes.main}>


      <div className={classes.container_lg}>
        {canvasComp()}
        {controllerComp()}
      </div>

      <div className={classes.container_sm}>

        <TabMenu 
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
        />

        <div className={classes.container_sm_content}>
          {
            currentMenu === 'preview' ?
              canvasComp() :
              (
                <div 
                className={classes.container_sm_content_controller}>
                  {controllerComp()}
                </div>
              )
          }
        </div>


      </div>

      <div className={classes.cart_action_container}>
        <KitchenCartAction 
          selectedIngredients={selectedIngredients}
          price={selectedIngredientDetail.price}
          add_custom_item={add_custom_item}
        />
      </div>

    </div>
  )
}