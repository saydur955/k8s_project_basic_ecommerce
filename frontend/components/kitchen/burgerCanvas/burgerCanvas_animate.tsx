import { FC, Dispatch, SetStateAction } from 'react';
import { GAME_MEASUREMENT } from '.';
import { getIngredientsList } 
from '../../../comp_functions/kitchen/burgerCanvas/getIngredientList';

// types
import { ty_ingredient_name } from '../../../types/ingredients.blueprint';

interface IComp {
  ctx: CanvasRenderingContext2D;
  canvasHeight: number;
  ingredientList: ty_ingredient_name[];
  isAddingIngredients: boolean;
}

export const BurgerCanvasAnimate: FC<IComp> = 
({ctx, ingredientList, isAddingIngredients, canvasHeight}) => {

  const ingredientClassList = getIngredientsList(ingredientList, canvasHeight);
  
  // console.log(list);



  const animate = () => {

    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, GAME_MEASUREMENT.canvasWidth, canvasHeight);

    // draw ingredinets
    // tomato.draw({ctx});
    // meat.draw({ctx});

    ingredientClassList.forEach((ingredient, idx) => {

      // ingredient.draw({ctx})
      ingredient.update({
        ctx,
        willAnimate: 
        idx === ingredientClassList.length -1 && isAddingIngredients ? true: false
      });
    })
    
    
    
    // =================== tested ===================
    // cheese.draw({ctx});
    // onion.draw({ctx});
    // bun_top.draw({ctx});
    // =================== not tested ===================
    // bun_bottom.draw({ctx});


    // ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    // ctx.fillRect(50, 450, 220, 30);


    requestAnimationFrame(animate);

  }

  animate();

  return null;
};