"use client";
// module
import { useState, useEffect, Fragment, FC } from "react";
import { get_current_foodList } from "@/comp_functions/primary/get_current_foodList";
// comp
import { HeaderPrimary } from "./header";
import { Category } from "./category";
import { Section } from "../shared/section";
import { FoodDetailUI } from "@/components/foods/details/detailUI";
import { ButtonSlider } from "../shared/button/button_slider";
import { FoodSlider } from "./foodSlider";
import { GetAllButton } from "./getAllButton";
// types
import {
  ty_FoodSummary_item,
  ty_FoodSummary_list,
  ty_category_item,
  ty_foodCategory,
} from "@/types/food.type";
import { ty_fetch_status } from "@/types/shared.type";
// style
import classes from "@/styles/primary/page.module.css";
import { KitchenDescription } from "./kitchen";
import { Facilities } from "./facilities";
import { HomeDelivary } from "./homeDelivary";

interface IComp {
  foodSummary: ty_FoodSummary_list;
}

export const Primary: FC<IComp> = ({ foodSummary }) => {

  const defaultCategoryId = foodSummary[0]._id;

  const defaultList = get_current_foodList({
    summaryList: foodSummary,
    selectdCategory: defaultCategoryId,
  });

  const [selectdCategory, setSelectedCategory] = useState<string>(defaultCategoryId);
  const [selectedFoodList, setSelectedFoodList] = useState<ty_FoodSummary_item[]>([...defaultList.currentList]);
  const [selectedFoodItem, setSelectedFoodItem] = useState<ty_FoodSummary_item | null>(
      defaultList.currentItem ? { ...defaultList.currentItem } : null
    );
  const [status, setStatus] = useState<ty_fetch_status>("success");
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);

  useEffect(() => {
    setStatus("loading");

    const { currentItem, currentList } = get_current_foodList({
      summaryList: foodSummary,
      selectdCategory,
    });

    setCurrentSliderIndex(0);
    setSelectedFoodList([...currentList]);
    setSelectedFoodItem(currentItem ? { ...currentItem } : null);
    setStatus("success");
  }, [selectdCategory]);

  // ----------- hanlde current food item -----------
  const handleCurrentFoodItem = (idx: number) => {
    setStatus("loading");

    const targetItem = selectedFoodList[idx];

    if (targetItem) {
      setSelectedFoodItem({ ...targetItem });
      setStatus("success");
      return null;
    }

    setStatus("error");
    setSelectedFoodItem(null);
  };

  // ----------- slider button handler -----------
  const leftHanlder = () => {
    currentSliderIndex === 0
      ? setCurrentSliderIndex(selectedFoodList.length - 1)
      : setCurrentSliderIndex(currentSliderIndex - 1);
  };

  const rightHanlder = () => {
    currentSliderIndex === selectedFoodList.length - 1
      ? setCurrentSliderIndex(0)
      : setCurrentSliderIndex(currentSliderIndex + 1);
  };

  const foodCompRender = () => {
    if (
      !selectedFoodItem ||
      selectedFoodList.length === 0 ||
      status === "loading"
    ) {
      return <p> loading.... </p>;
    }

    return (
      <Fragment>
        <div style={{ position: "relative" }}>
          <FoodDetailUI item={selectedFoodItem} />

          <ButtonSlider
            clsName={classes.btn_container}
            leftHanlder={leftHanlder}
            rightHanlder={rightHanlder}
          />
        </div>

        <FoodSlider
          food_list={selectedFoodList}
          selected_item_idx={selectedFoodItem.id}
          handleCurrentFoodItem={handleCurrentFoodItem}
          leftHanlder={leftHanlder}
          rightHanlder={rightHanlder}
          currentSliderIndex={currentSliderIndex}
        />

        <GetAllButton selectdCategory={selectdCategory} />
      </Fragment>
    );
  };

  return (
    <Fragment>
      <HeaderPrimary />

      <Category
        selectdCategory={selectdCategory}
        categoryList={foodSummary.map(el => ({ _id: el._id, name: el.categoryName }))}
        setSelectedCategory={setSelectedCategory}
      />
      {foodCompRender()}

      <KitchenDescription />

      <Facilities />

      <HomeDelivary />
    </Fragment>
  );
};
