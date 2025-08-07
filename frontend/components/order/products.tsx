import { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
import classes from '@/styles/order/products/products.module.css';
import {
  ty_order_create_reqBody_foodList_item,
  ty_order_product_custom_item,
  ty_order_product_predefine_item
} from '@/types/order.type';
import { Section } from '@/components/shared/section';
import { useCart } from '@/hooks/useCart';
import { Spinner_Page } from '@/components/shared/spinner/page';
import { ty_selected_cart_list } from '@/types/cart.type';
import { Cart_Item } from '@/components/foods/cart_item';
import { CartItem_Secton_Header } from '@/components/foods/cart_item/secton_header';
import { Section_Title } from './shared/section_title';
import { Typo } from '../shared/typography';

interface IComp {
  selectedList: ty_selected_cart_list;
  summary: {
    price: number;
    quantity: number;
  };
  setCreateOrderFoodList: 
  Dispatch<SetStateAction<ty_order_create_reqBody_foodList_item[]>>
}

export const OrderProducts: FC<IComp> = ({ 
  selectedList, setCreateOrderFoodList, summary 
}) => {

  const [customProductList, setCustomProductList] =
    useState<ty_order_product_custom_item[]>([]);

  const [predefineProductList, setPredefineProductList] =
    useState<ty_order_product_predefine_item[]>([]);

  const { status, cartList } = useCart();

  const summaryData = [
    { label: 'Total Items', value: summary.quantity  },
    { label: 'Total Price', value: `$${summary.price}` }
  ];


  useEffect(() => {

    let custom_product_list: ty_order_product_custom_item[] = [];
    let predefined_product_list: ty_order_product_predefine_item[] = [];

    let reqBodyList: ty_order_create_reqBody_foodList_item[] = [];

    // ========== get custom products
    Object.keys(selectedList.custom_list).forEach(el => {

      // get target item
      const customItem = cartList.custom_list[Number(el)];

      if (customItem) {
        custom_product_list.push(customItem);

        reqBodyList.push({
          total_item: customItem.amount,
          custom_ingredients: customItem.ingredients,
          custom_name: customItem.name
        });

      }

    });


    // ========== get predefined products
    Object.keys(selectedList.predefined_list).forEach(el => {

      // get target item
      const preDefineItem = cartList.predefined_list[el];

      if (preDefineItem) {
        predefined_product_list.push(preDefineItem);

        reqBodyList.push({
          total_item: preDefineItem.amount,
          food_id: preDefineItem.food_id
        });

      }

    });

    setPredefineProductList([...predefined_product_list]);
    setCustomProductList([...custom_product_list]);

    setCreateOrderFoodList([...reqBodyList]);


  }, [status, cartList, selectedList]);


  if (status === 'loading') {
    return (
      <Spinner_Page />
    )
  }

  return (
    <Section>

      <Section_Title title="Order Products" />

      <div className={classes.root}>

        {

          customProductList.length > 0 && (
            <>
              <CartItem_Secton_Header title="Your own created Burgers" />

              <div style={{ marginBottom: '6rem' }} >


                {
                  customProductList.map((el, idx) =>
                    <Cart_Item key={idx}
                      custom_item={el} item_idx={idx}
                      compClass={{}} type="order"
                    />
                  )
                }

              </div>


            </>
          )

        }



        {

          predefineProductList.length > 0 && (
            <>
              <CartItem_Secton_Header title="Pre Defined Burgers" />

              <div>

                {
                  predefineProductList.map((el, idx) =>
                    <Cart_Item key={el.food_id}
                      predefine_item={el} item_idx={idx}
                      compClass={{}} type="order"
                    />
                  )
                }

              </div>


            </>
          )

        }

        {/* ======================= summary data list ======================= */}
        <div className={classes.summaryList}>

          {
            summaryData.map(el => (
              <div key={el.label} className={classes.summary_item}>

                <Typo txt={`${el.label}:`} size="2rem" 
                  weight={400}
                />

                <Typo txt={el.value} size="2rem" 
                  weight={500}
                />

              </div>
            ))
          }

        </div>



      </div>

    </Section>
  )

}