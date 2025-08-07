"use client";
import { useState, useEffect, FC } from 'react';
import { useCart } from '../../../hooks/useCart';
import { ty_food_one_detail_primaryUI } from '../../../types/food.type';
import { Button } from '@/components/shared/button/button';
import { Typo } from '@/components/shared/typography';
import classes from '@/styles/foods/details/detailUI.module.css';
import { Section } from '@/components/shared/section';

interface IComp {
  item: ty_food_one_detail_primaryUI
}

export const FoodDetailUI: FC<IComp> = ({ item }) => {

  const [isAddedOnCart, setIsAddedOnCart] = useState<boolean | null>(null);

  const {
    check_item_on_cartList,
    add_predefined_item, remove_predefined_item
  } = useCart();


  useEffect(() => {

    const isAlreayExist = check_item_on_cartList(item.id);
    setIsAddedOnCart(isAlreayExist);

  }, [item.id, check_item_on_cartList])


  const addToCartHanlder = () => {

    add_predefined_item({
      food_id: item.id,
      name: item.name,
      image: item.image,
      single_price: item.price,
      amount: 1
    });
    setIsAddedOnCart(true);
  }


  const removeFromCartHanlder = () => {
    remove_predefined_item(item.id);
    setIsAddedOnCart(false);
  }

  const buttonComp = () => {

    if (isAddedOnCart === null) {
      // return <SpinnerSectionPart />
      return null;
    }

    if (isAddedOnCart) {
      return (
        <Button txt="Remove From Cart" size="medium"
          onClick={removeFromCartHanlder}
        />
      )
    }

    return (
      <Button txt="Add To Cart" size="medium"
        onClick={addToCartHanlder}
      />
    )


  }

  return (
    <Section section_sx={{marginTop: '0rem'}} >

      <div className={classes.root}>

        {/* =============================== product data =============================== */}
        <div className={classes.product_data}>

          <Typo txt={item.name} variant="h2" clsName={classes.header}
            // clsNameParent={classes.header_container}
            size="3rem" weight={700} color="#000000" margin="0"
          />

          <Typo txt={item.subtitle} color="#B69A81"
            size="2rem" weight={700} margin="2rem 0 0 0"
          />

          <Typo txt={item.description}
            Sx={{ lineHeight: '1.8' }} margin="2rem 0 0 0"
          />

          <div className={classes.txtContainer} style={{ marginTop: '1.5rem' }} >

            <Typo txt="Serving Size:" weight={700}
              margin="0 0.5rem 0 0"
            />

            <Typo txt={item.size} />

          </div>

          <div className={classes.txtContainer} style={{ marginTop: '2rem' }} >

            <Typo txt="Price:" weight={700}
              margin="0 1rem 0 0"
            />

            <Typo txt={`$ ${item.price}`}
              color="#DB0007" weight={400} size="2.5rem"

            />

          </div>

          <div style={{ marginTop: '2.5rem' }} >
            {buttonComp()}
          </div>

          {/* <div style={{marginTop: '2.5rem'}} >
          <Button txt="Add To Cart" size="medium"
            onClick={()=> add_predefined_item({
              food_id: item.id,
              name: item.name,
              image: item.image_lg,
              price: item.price,
              amount: 1
            })}
          />
        </div> */}

        </div>

        {/* =============================== product image =============================== */}
        <div className={classes.product_img}>

          <div className={classes.img_container}>
            <img src={item.image} alt="Food"
              width={500} height={500}
            />
          </div>

        </div>

      </div>
    </Section>
  )
}