// module
import { useState, FC, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
// comp
// styles
import classes from '@/styles/cart/summary.module.css';
// types
import { ty_cart_list, ty_selected_cart_list } from '../../types/cart.type';
import { Typo } from '@/components/shared/typography';
import { Button } from '@/components/shared/button/button';
import { useOrder } from '@/hooks/useOrder';
import { Dashboard_navigation_item } from '@/dashboard/navigation';
import { SnackBar, ty_snackbar_type } from '../shared/snackbar';
import { useAuth } from '@/hooks/useAuth';

interface T_itemRender {
  title: string;
  value: string | number;
  isBold?: boolean;
}

interface T_calcData {
  subtotal: number;
  totalAmount: number;
}

interface IComp {
  selectedList: ty_selected_cart_list;
  cartList: ty_cart_list
}

type T_snackMsg = { type: ty_snackbar_type; msg: string };

export const SummaryCart: FC<IComp> = ({ selectedList, cartList }) => {

  const [summaryData, setSummaryData] = useState<T_calcData>({ ...calculateData() });
  const [placeOrderDisabled, setPlaceOrderDisabled] = useState(false);
  const [snackMsg, setSnackMsg] = useState<T_snackMsg | null>(null);
  
  const router = useRouter();
  const { set_order_data } = useOrder();
  const { authData } = useAuth();

  function calculateData() {

    let subtotal = 0;
    let totalAmount = 0;

    // handle custom list
    Object.keys(selectedList.custom_list).forEach(el => {

      // get target item
      const customItem = cartList.custom_list[Number(el)];

      if (customItem) {
        subtotal = subtotal + customItem.single_price * customItem.amount;
        totalAmount = totalAmount + customItem.amount;
      }

    });


    // handle predefine list
    Object.keys(selectedList.predefined_list).forEach(el => {

      // get target item
      const preDefineItem = cartList.predefined_list[el];

      if (preDefineItem) {
        subtotal = subtotal + preDefineItem.single_price * preDefineItem.amount;
        totalAmount = totalAmount + preDefineItem.amount;
      }

    });

    return {
      totalAmount,
      subtotal
    }

  }

  useEffect(() => {

    setSummaryData({ ...calculateData() });

    if (
      Object.keys(selectedList.custom_list).length === 0 &&
      Object.keys(selectedList.predefined_list).length === 0
    ) {
      setPlaceOrderDisabled(true);
    }
    else {
      setPlaceOrderDisabled(false);
    }

  }, [selectedList, cartList]);



  // ========================= order handler =========================
  const orderHandler = () => {

    if (placeOrderDisabled) {
      setSnackMsg({ type: 'error', msg: 'No item seletcted' });
      return null;
    }

    if(!authData) {

      setSnackMsg({
        type: 'error', msg: 'Sign in to Place Order'
      });

      return null;
    }

    set_order_data({
      selectedList: { ...selectedList },
      summaryData: {
        quantity: summaryData.totalAmount,
        price: summaryData.subtotal
      }
    });

    // let custom_ids = Object.keys(selectedList.custom_list).join(',');
    // let predefine_ids = Object.keys(selectedList.predefined_list).join(',');

    // let order_url = '/order?';

    // if(custom_ids) order_url = `${order_url}custom=${custom_ids}&`;

    // if(predefine_ids) order_url = `${order_url}predefined=${predefine_ids}`;

    // if(!custom_ids && !predefine_ids) return null;

    router.push(Dashboard_navigation_item.order);

  }



  const itemRender = ({ title, value, isBold }: T_itemRender) => {

    return (
      <div className={classes.itemContainer}>

        <Typo txt={title} color="#7b7b7b" margin="0" size="1.6rem" />

        <Typo txt={value} color="var(--color_black)" margin="0"
          size={isBold ? "1.8rem" : "1.6rem"}
          weight={isBold ? 500 : 400}
        />

      </div>
    )

  }

  return (
    <Fragment>

      {
        snackMsg &&
        <SnackBar
          isOpen={snackMsg ? true : false}
          closeHandler={() => setSnackMsg(null)}
          type={snackMsg.type} message={snackMsg.msg}
        />
      }

      <div className={classes.root}>

        <div className={classes.itemList}>

          {itemRender({ title: 'Amount', value: summaryData.totalAmount })}

          {
            itemRender({
              title: 'Subtotal',
              value: `$ ${summaryData.subtotal}`
            })
          }

          {itemRender({ title: 'Shipping', value: '$ 0' })}

        </div>

        <div style={{ marginTop: '3rem' }} >

          {
            itemRender({
              isBold: true,
              title: 'Subtotal',
              value: `$ ${summaryData.subtotal}`
            })
          }

        </div>

        <div className={classes.btn_container}>
          <Button txt="place Order" isFullWidth={true} onClick={orderHandler} />
        </div>


      </div>
    </Fragment>

  )
};