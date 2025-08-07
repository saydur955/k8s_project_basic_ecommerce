import { FC } from 'react';
import { PartSection } from '.';
// style
import { ty_cart_custom_item, ty_cart_predefine_item } from '@/types/cart.type';
import { CartItem_Secton_Header } from '@/components/foods/cart_item/secton_header';
import { Cart_Item } from '@/components/foods/cart_item';

interface IComp {
  predefineList: ty_cart_predefine_item[];
  customList: ty_cart_custom_item[];
}

export const OrderDetails_Products: FC<IComp> = ({ predefineList, customList }) => {

  return (
    <PartSection title="Ordered Products" >

      {

        customList.length > 0 && (
          <>
            <CartItem_Secton_Header title="Your own created Burgers" />

            <div style={{ marginBottom: '6rem' }} >


              {
                customList.map((el, idx) =>
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

        predefineList.length > 0 && (
          <>
            <CartItem_Secton_Header title="Pre Defined Burgers" />

            <div>

              {
                predefineList.map((el, idx) =>
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

    </PartSection>
  )

};