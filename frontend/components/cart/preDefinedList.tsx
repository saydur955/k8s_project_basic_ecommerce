// module
import { FC } from 'react';
// comp
import { Typo } from '@/components/shared/typography';
import { ty_cart_Context } from '@/context/cartContext';
import { Cart_Item } from '@/components/foods/cart_item';
import { CartItem_Secton_Header } from '../foods/cart_item/secton_header';


interface IComp {
  cartCtx: ty_cart_Context;
}

export const PreDefinedList: FC<IComp> = ({cartCtx}) => {

  const list = Object.values(cartCtx.cartList.predefined_list);

  if(list.length < 1) return null;

  return (
    <div>


      {/* <CartItem_Secton_Header title="Burgers" /> */}

      <div>

        {
          list.map((el, idx) => <Cart_Item key={el.food_id}
            type="order" item_idx={idx}
            predefine_item={el} cartCtx={cartCtx}
            compClass={{}}
            
          />)
        }

      </div>

    </div>
  )

};