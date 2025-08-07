import { 
  burger_ingredient_item_list, 
  burger_ingredient_bread_item_list,
  burger_ingredient_bread_full_list
} from './burger_ingredients_data';

interface T_breadData {
  [key: string]: {
    name: string;
    top: number;
    bottom: number;
  }
}

export const check_ordered_burger_ingredients = (list: string[]) => {


  let totalPrice = 0;
  let breadData: T_breadData = {};

  for(let i=0; i<list.length; i++) {

    const listItem = list[i];
    if(!listItem) return null;

    // check for all ingredients except bread
    const currentIngredientItem = burger_ingredient_item_list[listItem];
    // const breadItem = burger_ingredient_bread_item_list[listItem];

    if(currentIngredientItem) { // if ingredinet (except bread) exist
      totalPrice = totalPrice + currentIngredientItem.price;
    } 
    else {
      // get bread item
      const breadItem = burger_ingredient_bread_item_list[listItem];

      if(!breadItem) return null;

      const currentBreadDataItem = breadData[breadItem.parent];

      if(currentBreadDataItem) {
        breadData = {
          ...breadData,
          [breadItem.parent]: {
            name: breadItem.parent,
            top: breadItem.type === 'top' ? currentBreadDataItem.top + 1: 
              currentBreadDataItem.top,
            bottom:  breadItem.type === 'bottom' ? currentBreadDataItem.bottom + 1: 
            currentBreadDataItem.bottom
          }
        }
      }
      else {
        breadData = {
          ...breadData,
          [breadItem.parent]: {
            name: breadItem.parent,
            top: breadItem.type === 'top' ? 1: 0,
            bottom: breadItem.type === 'bottom' ? 1: 0
          }
        }
      }

    }

  }

  // add bread price
  Object.values(breadData).forEach(el => {

    const burgerFull = burger_ingredient_bread_full_list[el.name];
    if(burgerFull) {
      totalPrice = totalPrice + (Math.max(el.bottom, el.top)*burgerFull.price)
    }

  })


  return {
    price: totalPrice
  };
  
}