import { ingredient_bread_list } from "../../data/ingredients/bread";
import { ingredient_cheese_list } from "../../data/ingredients/cheese";
import { ingredient_leaf_list } from "../../data/ingredients/leaf";
import { ingredient_meat_list } from "../../data/ingredients/meat";
import { ingredient_vegetable_list } from "../../data/ingredients/vegetable";
import { 
  ty_ingredient_category, ty_ingredient_item, 
  ty_ingredient_name, ty_selected_ingredient_detail 
} from "../../types/ingredients.blueprint";

export const getIngredientItems = (ingreList: ty_ingredient_name[]) => {

  let convertedList: ty_selected_ingredient_detail[] = [];

  ingreList.forEach(item => {

    const firstLetter = item.split('_')[0];
    const category = 
    firstLetter.charAt(0).toUpperCase() + firstLetter.slice(1) as ty_ingredient_category;

    // ----------------- Big O is o(n^3) -----------------
    // but I'm sure know that, the burger list is very short
    // that's for it isn't any problem
    if(category === 'Bread') {

      ingredient_bread_list.forEach(bread => {
        if(bread.items) {
          // const targetBredPart =  bread.items.find(el => el.name === item);
          const targetBredPart =  Object.values(bread.items).find(el => el.name === item);
          console.log(targetBredPart);
          if(targetBredPart) {
            convertedList = [
              ...convertedList,
              {
                ...targetBredPart,
                price: bread.price
              }
            ];
            return;
          }
        }
      })

    }

    
    let targetList: ty_ingredient_item[]|null = null;
    if (category === 'Cheese') {
      targetList = ingredient_cheese_list;
    }
    else if(category === 'Leaf') {
      targetList = ingredient_leaf_list;
    }
    else if(category === 'Meat') {
      targetList = ingredient_meat_list;
    }
    else if(category === 'Vegetable') {
      targetList = ingredient_vegetable_list;
    }

    if(!targetList) return;

    const targetItem =  targetList.find(el => el.name === item);

    if(targetItem) {
      convertedList = [
        ...convertedList,
        {
          name: targetItem.name,
          display_name: targetItem.display_name,
          price: targetItem.price,
          img: targetItem.img,
          img_height: targetItem.img_height
        }
      ]
    }


  });

  return convertedList;

}