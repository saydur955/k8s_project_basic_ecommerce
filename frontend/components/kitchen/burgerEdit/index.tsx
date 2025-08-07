// module
import { useState, useEffect, useRef, FC, Dispatch, SetStateAction, DragEvent } 
from 'react';
// comp
import { BurgerItem } from './burgerItem';
// types
import { ty_ingredient_name, ty_selected_ingredient_detail } from 
'../../../types/ingredients.blueprint';
// style
import classes from './burgerEdit.module.css';
import { NextImage } from '../../shared/nextImage';
import { get_ingredient_details_list } 
from '../../../comp_functions/kitchen/get_ingredient_detail';
import { get_ingredient_measurement } 
from '../../../comp_functions/kitchen/burgerCanvas/getIngredientList';
import { Typo } from '@/components/shared/typography';

interface IComp {
  setSelectedIngredients: Dispatch<SetStateAction<ty_ingredient_name[]>>;
  selectedIngredients: ty_ingredient_name[];
  setIsAddingIngredients: Dispatch<SetStateAction<boolean>>;
  setcanvasHeight: Dispatch<SetStateAction<number>>;
  selectedIngredientDetail: ty_selected_ingredient_detail[];
}

const DROP_POSITION_ATTR = 'dropPositionAttr';

export const BurgerEdit: FC<IComp> = ({
  selectedIngredientDetail,
  selectedIngredients, setSelectedIngredients, 
  setIsAddingIngredients, setcanvasHeight
}) => {

  const [targetItemIdx, setTargetItemIdx] = useState<number|null>(null);
  const dropOverItemIdxRef = useRef<null | number>(null);

  // ===================== handle drag start event =====================
  const dragStartHandler = (e: DragEvent<HTMLDivElement>, idx:number) => {
    setTargetItemIdx(idx)
  }

  // ===================== handle drag over event =====================
  const dragOverHanlder = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // @ts-ignore
    const targetAttr = e.target.getAttribute('custom-attribute');

    // check targetAttr
    if (targetItemIdx === null || !targetAttr || 
      typeof targetAttr !== 'string' || !targetAttr.startsWith(DROP_POSITION_ATTR)) {
      return null;
    }

    const currentdropItemIdx = dropOverItemIdxRef.current;

    // if current dropOverItemIdxRef is number and targetAttr === DROP_POSITION_ATTR
    // then return null
    if (currentdropItemIdx !== null && targetAttr === DROP_POSITION_ATTR) {
      return null;
    }

    let dropItemIdx: number | null = null;

    let tempIdx = targetAttr.split('_')[1];
    if (!tempIdx) return null;

    dropItemIdx = Number(tempIdx);

    if (dropItemIdx > selectedIngredients.length) {
      dropItemIdx = selectedIngredients.length - 1;
    }

    if (dropItemIdx === null) return null;

    dropOverItemIdxRef.current = dropItemIdx;

  }

  // ===================== handle drop event =====================
  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const dropItemIdx = dropOverItemIdxRef.current;

    if (
      dropItemIdx === null || targetItemIdx === null || 
      targetItemIdx === dropItemIdx
    ) {
      return null;
    }

    const targetItem = selectedIngredients[targetItemIdx];
    const tempList = [...selectedIngredients];
    tempList.splice(targetItemIdx, 1);
    const firstPart = tempList.slice(0, dropItemIdx)
    const lastPart = tempList.slice(dropItemIdx)

    setIsAddingIngredients(false);
    setSelectedIngredients([...firstPart, targetItem, ...lastPart]);
  }


  // ===================== remove handler =====================
  const removeHanlder = (itemIdx: number) => {

    const tempList = [...selectedIngredients];

    // get targer removed item
    const removedItem =  selectedIngredients[itemIdx];
    if(!removedItem) return null;

    const itemMeasure = get_ingredient_measurement(removedItem);

    if(!itemMeasure) return null;

    tempList.splice(itemIdx, 1);
    setIsAddingIngredients(false);
    setSelectedIngredients([...tempList]);
    setcanvasHeight(prev => prev - itemMeasure.shortenHeight + itemMeasure.fadedHeight);

  }


  if(selectedIngredients.length < 1) {
    return (
      <div className={classes.empty_container} >
          <NextImage alt="empty plate" src="/images/kitchen/empty_cart.png"
            width={60} height={60}
          />
          <Typo txt="No Burger Ingredients" align="center"
            variant="h3" weight={300} margin="2rem 0"
          />
      </div>
    )
  }

  return (
    <div className={classes.root}>

      <div className={classes.main_container}>


        <div  className={classes.item_list}
           custom-attribute={DROP_POSITION_ATTR}
           onDragOver={dragOverHanlder}
           onDrop={dropHandler}
        >
          {
            selectedIngredientDetail.map((item, idx) => (
              <BurgerItem key={idx} idx={idx} item={item}
                customAtribute={`${DROP_POSITION_ATTR}_${idx}`}
                dragStartHandler={dragStartHandler}
                removeHanlder={removeHanlder}
              />
            ))
          }
        </div>

      </div>

    </div>
  )

};