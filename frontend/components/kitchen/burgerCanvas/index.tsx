import { useState, useEffect, useRef, Fragment, FC } from 'react';
import { ty_ingredient_name } from '../../../types/ingredients.blueprint';
import { BurgerCanvasAnimate } from './burgerCanvas_animate';
import { BurgerCanvasUI } from './burgerCanvas_ui';

interface IComp {
  ingredientList: ty_ingredient_name[];
  isAddingIngredients: boolean;
  canvasHeight: number;
}

// image size: 250, 280

/*

  'bread_white_bun_bottom',
  'vegetable_cucumber',
  'vegetable_onion',
  'vegetable_tomato',
  'meat_beef',
  'leaf_lettuce',
  'bread_white_bun_top',


*/

const ingredients_list: ty_ingredient_name[] = [
  'bread_wholemeal_bun_bottom',
  'leaf_lettuce',
  'meat_beef',
  'cheese_stilton',
  'vegetable_tomato',
  'bread_wholemeal_bun_top',
]

export const GAME_MEASUREMENT = {
  canvasWidth: 320,
  // canvasHeight: 600,
}


export const BurgerCanvas: FC<IComp> = 
({ ingredientList, isAddingIngredients, canvasHeight }) => {

  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);


  // ============================ initiate the canvas ============================
  useEffect(() => {

    if(canvasRef.current) {

      const ct = canvasRef.current.getContext('2d');
      setCtx(ct);
      canvasRef.current.width = GAME_MEASUREMENT.canvasWidth;
      canvasRef.current.height = canvasHeight;
    }

  }, [canvasHeight]);


  return (
    <Fragment>

      <BurgerCanvasUI ctx={ctx} canvasRef={canvasRef}
      />

      {
        canvasRef.current && ctx &&
        <BurgerCanvasAnimate ctx={ctx} ingredientList={ingredientList}
          isAddingIngredients={isAddingIngredients}
          canvasHeight={canvasHeight}
        />
      }

    </Fragment>
  )

};