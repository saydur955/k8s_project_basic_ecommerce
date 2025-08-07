import { ty_foodCategory, ty_FoodSummary_item, ty_FoodSummary_list } 
from "../../types/food.type"

interface T_param {
  summaryList: ty_FoodSummary_list;
  selectdCategory: string;
}

interface T_res {
  currentList: ty_FoodSummary_item[]
  currentItem: ty_FoodSummary_item | null
}

export const get_current_foodList = 
({ selectdCategory, summaryList }: T_param): T_res => {

  let currentList: ty_FoodSummary_item[] = [];
  let currentItem: ty_FoodSummary_item | null = null;

  if(!summaryList) {
    return {
      currentList, currentItem
    }
  }

  const targetCatData = summaryList.find(el => el._id === selectdCategory);

  if(!targetCatData) {
    return {
      currentList, currentItem
    }
  }

  currentList = targetCatData.itemList;

  currentItem = currentList[0] ? currentList[0] : null;

  return {
    currentList, currentItem
  }

}