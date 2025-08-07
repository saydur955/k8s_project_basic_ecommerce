import { ingredient_bread_item, ingredient_bread_list } from "../../data/ingredients/bread";
import { ingredient_cheese_list } from "../../data/ingredients/cheese";
import { ingredient_leaf_list } from "../../data/ingredients/leaf";
import { ingredient_meat_list } from "../../data/ingredients/meat";
import { ingredient_vegetable_list } from "../../data/ingredients/vegetable";
import {
  ty_bread_slide,
  ty_ingredient_category, ty_ingredient_item,
  ty_ingredient_name, ty_selected_ingredient_detail
} from "../../types/ingredients.blueprint";

interface T_bread_slides_data {
  [key: string]: {
    name: string;
    top: number;
    bottom: number;
  }
}

interface T_res {
  detailList: ty_selected_ingredient_detail[];
  price: number;
}

const get_category_name = (item: string): ty_ingredient_category => {
  const firstLetter = item.split('_')[0];
  const category =
    firstLetter.charAt(0).toUpperCase() + 
    firstLetter.slice(1) as ty_ingredient_category;
  return category;
}

export const get_ingredient_details_list = (ingreList: ty_ingredient_name[]): T_res => {

  let convertedList: ty_selected_ingredient_detail[] = [];
  let bread_slides_data: T_bread_slides_data = {};


  // ============================ calculate bread slice data
  ingreList.forEach(item => {

    const category = get_category_name(item);

    if (category === 'Bread') {
      // get bread item
      const breadItem = ingredient_bread_item[item];
      if (!breadItem) return null;

      const currentBreadDataItem = bread_slides_data[breadItem.parent];

      if (currentBreadDataItem) {
        bread_slides_data = {
          ...bread_slides_data,
          [breadItem.parent]: {
            name: breadItem.parent,
            top: breadItem.type === 'top' ? currentBreadDataItem.top + 1 :
              currentBreadDataItem.top,
            bottom: breadItem.type === 'bottom' ? currentBreadDataItem.bottom + 1 :
              currentBreadDataItem.bottom
          }
        }
      }
      else {
        bread_slides_data = {
          ...bread_slides_data,
          [breadItem.parent]: {
            name: breadItem.parent,
            top: breadItem.type === 'top' ? 1 : 0,
            bottom: breadItem.type === 'bottom' ? 1 : 0
          }
        }
      }
    }

  });

  // ============================ get ingredients details list
  ingreList.forEach(item => {

    const category = get_category_name(item);

    // calculate ingredinets only for bread
    if (category === 'Bread') {

      // get the source of bread. means, get parent bread name and the type of
      // current slice
      const breadSource = ingredient_bread_item[item];

      // get total slices amount of that burger
      const breadSliceData = bread_slides_data[breadSource.parent];

      if(!breadSliceData) return null;

      // the data of the targeted burger
      const breadParentDetail = 
      ingredient_bread_list.find(el => el.name === breadSource.parent);

      if(!breadParentDetail || !breadParentDetail.items ) return null;

      if(breadSource.type === 'bottom') {

        const targetSlide = breadParentDetail.items.bottom;
        let itemPrice: number;

        // if bun bottom is greater than bun top
        // then itemPrice will be whole bun price
        // and remove one bottom bun from bread_slides_data
        if(breadSliceData.bottom > breadSliceData.top) {

          // if there have extra buttom bun, then the price will be - 
          // the price of whole bread
          itemPrice = breadParentDetail.price;

          // reduce one bottom bun from the list
          bread_slides_data = {
            ...bread_slides_data,
            [breadSource.parent]: {
              ...breadSliceData,
              bottom: breadSliceData.bottom - 1
            }
          }
        }
        else {
          itemPrice = targetSlide.price;
        }

        convertedList = [
          ...convertedList,
          {
            ...targetSlide,
            price: itemPrice
          }
        ]
      }
      else if(breadSource.type === 'top') {

        const targetSlide = breadParentDetail.items.top;
        let itemPrice: number;

    
        // same logic as bottom bun
        if(breadSliceData.top > breadSliceData.bottom) {

          itemPrice = breadParentDetail.price;

          bread_slides_data = {
            ...bread_slides_data,
            [breadSource.parent]: {
              ...breadSliceData,
              top: breadSliceData.top - 1
            }
          }
        }
        else {
          itemPrice = targetSlide.price;
        }

        convertedList = [
          ...convertedList,
          {
            ...targetSlide,
            price: itemPrice
          }
        ]
      }

    }


    let targetList: ty_ingredient_item[] | null = null;
    if (category === 'Cheese') {
      targetList = ingredient_cheese_list;
    }
    else if (category === 'Leaf') {
      targetList = ingredient_leaf_list;
    }
    else if (category === 'Meat') {
      targetList = ingredient_meat_list;
    }
    else if (category === 'Vegetable') {
      targetList = ingredient_vegetable_list;
    }

    if (!targetList) return;

    const targetItem = targetList.find(el => el.name === item);

    if (targetItem) {
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

  // let totalPrice = convertedList.reduce(
  //   (prev, current) => prev.price + current.price
  // )

  let totalPrice = 0;
  convertedList.forEach(el => {
    totalPrice = totalPrice + el.price;
  })

  return {
    detailList: convertedList,
    price: totalPrice
  }

}