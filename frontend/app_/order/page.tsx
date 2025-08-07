"use client";
// module
import { useState, useEffect, Fragment } from 'react';
import { useOrder } from '@/hooks/useOrder';
import { useRouter } from 'next/navigation';
import { Dashboard_navigation_item } from '@/dashboard/navigation';
// functin + data
import { cls_join } from '@/functions/cls_join.func';
// comp
import { Section } from "@/components/shared/section";
import { Stepper } from "@/components/shared/stepper";
import { OrderProducts } from '@/components/order/products';
import { Spinner_Page } from '@/components/shared/spinner/page';
// style
import classes from '@/styles/order/page.module.css'
// type
import { Icon_Arrow_Left } from '@/components/icons/arrow_left';
import { Icon_Arrow_Right } from '@/components/icons/arrow_right';
import { IconButton } from '@/components/shared/button/icon_button';
import { Order_Complete } from '@/components/order/complete_order';
import { ty_order_create_reqBody_foodList_item, ty_payment_method }
  from '@/types/order.type';
import { ty_fetch_status } from '@/types/general.type';
import { Fetch } from '@/functions/fetch';
import { ReactQueryProvider } from '@/lib/react_query/queryClient';
import { Spinner_Section } from '@/components/shared/spinner/section';
import { Order_Payment_Complete } from '@/components/order/complete_payment';

type T_createdOrder = {
  status: ty_fetch_status;
  order_id: null;
}

const list = ['Products', 'Order', 'Payment'];


export default function OrderPage() {

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isStepperDisable, setIsStepperDisable] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: '', phone: ''
  });
  const [selectedPayMethod, setSelectedPayMethod] =
    useState<ty_payment_method | null>(null);
  const [createOrderFoodList, setCreateOrderFoodList] =
    useState<ty_order_create_reqBody_foodList_item[]>([]);
  const [createdOrder, setCreateOrder] = useState<T_createdOrder | null>(null);

  const { orderStatus, orderSummary } = useOrder();
  const router = useRouter();


  useEffect(() => {

    if (orderStatus === 'success' && !orderSummary) {
      router.push(Dashboard_navigation_item.cart);
    }

  }, [orderSummary, orderStatus]);

  // ============ handle steper button disability =================
  useEffect(() => {

    if (currentIdx >= list.length - 1) {
      setIsStepperDisable(true);
      return;
    }

    if (list[currentIdx] === 'Order') {

      if (
        !shippingAddress.address || !shippingAddress.phone || 
        !selectedPayMethod || 
        !createdOrder || !createdOrder.order_id
      ) {
        setIsStepperDisable(true);
        return;
      }

    }

    setIsStepperDisable(false);

  }, [currentIdx, selectedPayMethod, shippingAddress, createdOrder]);


  // ================= order create handler =================
  const orderCreateHanlder = async () => {
    try {

      if (createOrderFoodList.length < 1) return null;

      setCreateOrder({
        status: 'loading',
        order_id: null
      });

      // req to server to create order
      const orderRes: any = await Fetch({
        url: '/orders/create',
        methodType: 'POST',
        data: {
          list: createOrderFoodList,
          deliver_address: "test address"
        },
        options: {
          cache: 'no-cache'
        }
      });

      setCreateOrder({
        status: 'success',
        order_id: orderRes.order_id
      });

      setCurrentIdx(currentIdx + 1);

    }
    catch (err) {

      setCreateOrder({
        status: 'error',
        order_id: null
      });

    }
  }



  // ================= step handler =================
  const step_increment_handler = () => {
    if (currentIdx >= list.length - 1) return null;
    setCurrentIdx(currentIdx + 1);
  }

  const step_decrement_handler = () => {
    if (currentIdx === 0) return null;
    setCurrentIdx(currentIdx - 1);
  }



  // ================= render comp =================

  const renderComp = () => {

    if (list[currentIdx] === 'Products' && orderSummary) {
      return <OrderProducts
        selectedList={orderSummary.selectedList}
        summary={orderSummary.summaryData}
        setCreateOrderFoodList={setCreateOrderFoodList}
      />
    }

    else if (list[currentIdx] === 'Order') {
      return <Order_Complete
        submitHanlder={orderCreateHanlder}
        selectedMethod={selectedPayMethod}
        setSelectedMethod={setSelectedPayMethod}
        shippingAddress={shippingAddress}
        setShippingAddress={setShippingAddress}
      />
    }


    else if (
      list[currentIdx] === 'Payment' &&
      createdOrder && createdOrder.order_id
    ) {
      return (
        <Order_Payment_Complete order_id={createdOrder.order_id} />
      )
    }

    return null;

  }



  if (orderStatus === 'loading' || !orderSummary) {
    return <Spinner_Page />
  }



  return (
    <ReactQueryProvider>
      <Spinner_Section
        isVisible={
          (createdOrder && createdOrder.status === 'loading') ?
            true : false
        }
      >

        <Section content_cls={classes.stepper_div} >
          <Stepper list={list} currentIdx={currentIdx} clsName={classes.stepper} />
        </Section>

        <div className={classes.content} >
          {
            renderComp()
          }
        </div>


        {/* ========================= step handler ========================= */}
        <Section
          section_cls={cls_join([classes.stepper_div, classes.btn_div])}
          content_cls={classes.stepper}
        >

          <IconButton
            disabled={currentIdx === 0}
            onClick={step_decrement_handler}
          >
            <Icon_Arrow_Left scale={0.6}
              fill={(currentIdx === 0) ? 'rgba(0, 0, 0, 0.4)' : 'var(--color_black)'}
            />
          </IconButton>

          <IconButton
            disabled={isStepperDisable}
            onClick={step_increment_handler}
          >
            <Icon_Arrow_Right scale={0.6}
              fill={isStepperDisable ? 'rgba(0, 0, 0, 0.4)' : 'var(--color_black)'}
            />
          </IconButton>

        </Section>



      </Spinner_Section>
    </ReactQueryProvider>
  )

}