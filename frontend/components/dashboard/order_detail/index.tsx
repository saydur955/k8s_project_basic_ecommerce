// module
import { useState, useEffect, Fragment, FC, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { query_order_getOne } from '@/lib/react_query/query/order';
// comp
import { Spinner_Page } from '../../shared/spinner/page';
import { Page_Message } from '../../shared/page_message';
import { Typo } from '../../shared/typography';
import { OrderDetails_Products } from './products';
import { OrderDetails_Summary } from './summary';
import { OrderDetails_Action } from './action';
// style
import classes from '@/styles/dashboard/order_detail/order_detail.module.css';
// types
import { ty_order_one_detail } from '@/types/order.type';
import { ty_cart_custom_item, ty_cart_predefine_item } from '@/types/cart.type';

export const Dashboard_Order_Detail = () => {

  const searchParams = useSearchParams();
  // get order id
  const order_id = searchParams.get('order_id');

  const { status, data: queryData } = query_order_getOne({ order_id: order_id || '' });

  const [orderData, setOrderData] = useState<ty_order_one_detail | null>(null);

  useEffect(() => {

    if (!queryData) return;

    // ============= rename the fields for client =============

    // hanlde custom items
    const foodItem_custom = queryData.custom.map((item: any) => {

      const currentItem: ty_cart_custom_item = {
        custom_id: item._id,
        ingredients: item.ingredients,
        name: item.name,
        single_price: item.single_price,
        amount: item.item_amount
      }

      return currentItem;

    });


    // hanlde custom items
    const foodItem_preDefined = queryData.pre_defined.map((item: any) => {

      const currentItem: ty_cart_predefine_item = {
        food_id: item.food_id,
        name: item.name,
        image: item.image_sm,
        single_price: item.single_price,
        amount: item.item_amount
      }

      return currentItem;

    });


    setOrderData({ 
      ...queryData,
      pre_defined: [...foodItem_preDefined],
      custom: [...foodItem_custom]
    });


  }, [queryData]);


  if (!order_id) {
    return <Page_Message msg="Invalid Order Id" />;
  }

  if (status === 'pending') {
    return <Spinner_Page />;
  }

  if (status === 'error' || !orderData) {
    return <Page_Message msg="Failed to get order" />;
  }

  return (
    <Fragment>

      <OrderDetails_Summary orderData={orderData} />

      <OrderDetails_Products
        predefineList={orderData.pre_defined}
        customList={orderData.custom}
      />

      {
        orderData && orderData.status === 'pending' &&
        <OrderDetails_Action orderData={orderData} />
      }


    </Fragment>
  )

};

interface IPartSection {
  title: string;
  children: ReactNode
}

export const PartSection: FC<IPartSection> = ({ title, children }) => {

  return (
    <div className={classes.part_section}>

      <Typo
        txt={title} variant="h4"
      />

      <div className={classes.content} >
        {children}
      </div>

    </div>
  )

}