// module
import { useEffect, useContext, FC } from 'react';
import { CartContext, ty_cart_Context } from '@/context/cartContext';
// comp
import { PreDefinedList } from '@/components/cart/preDefinedList';
import { CustomList } from '@/components/cart/customList';
import { Typo } from '@/components/shared/typography';
import { Section } from '@/components/shared/section';
import { SummaryCart } from '@/components/cart/summary';
import { NextImage } from '@/components/shared/nextImage';
// styles
import classes from '@/styles/cart/page.module.css';
import { Spinner_Page } from '@/components/shared/spinner/page';

interface IComp {
  cartCtx: ty_cart_Context;
}

export const CartComp: FC = () => {

  const cartCtx = useContext(CartContext);

  const { status, cartList, selectedList, select_all_items } = cartCtx;


  useEffect(() => {

    if(status === 'success') {
      select_all_items();
    }


  }, [status])


  if (status === 'loading' || status === 'error') {
    return <Spinner_Page />
  }

  if (
    Object.keys(cartList.custom_list).length < 1 &&
    Object.keys(cartList.predefined_list).length < 1
  ) {
    return (
      <div className={classes.empty_cart_wrapper} >
        <NextImage src="/images/cart/empty_cart.svg" alt="empty cart"
          width={500} height={417}
        />
        <Typo txt="No Foods On Cart" margin="8rem 0 0 0"
          variant="h3" weight={400} align="center"
        />
      </div>
    )
  }


  return (

    <Section
      section_sx={{marginTop: '6rem'}}
    >

      <div className={classes.root}>

        <div className={classes.itemContainer}>

          <CustomList
            cartCtx={cartCtx}
          />

          <PreDefinedList
            cartCtx={cartCtx}
          />

        </div>


        <div className={classes.summaryContainer}>
            <SummaryCart
              cartList={cartList}
              selectedList={selectedList}
            />
          </div>

      </div>

    </Section>

  )

}