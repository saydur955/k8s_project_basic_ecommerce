// module
import { FC, Dispatch, SetStateAction } from 'react';
// comp
import { Section } from '../shared/section';
import { Section_Title } from './shared/section_title';
import { Payment_Method } from './shared/payment_method';
import { TextField } from '../shared/text_field';
// types
import { ty_payment_method } from '@/types/order.type';
// style
import classes from '@/styles/order/complete_order.module.css';
import { Typo } from '../shared/typography';

interface IComp {
  selectedMethod: ty_payment_method | null;
  setSelectedMethod: Dispatch<SetStateAction<ty_payment_method | null>>;
  submitHanlder: () => void;
  shippingAddress: {
    address: string;
    phone: string;
  }
  setShippingAddress: Dispatch<SetStateAction<{
    address: string;
    phone: string;
  }>>
}


export const Order_Complete: FC<IComp> = ({
  selectedMethod, setSelectedMethod, submitHanlder,
  shippingAddress, setShippingAddress
}) => {


  return (
    <Section>

      <Section_Title title="Complete Order" />


      <div className={classes.root}>

        {/* ======================= shipping div ======================= */}
        <div className={classes.shipping_div}>

          <Typo
            txt="Shipping Form" variant="h5" align='center'
            margin="0 0 3.5rem 0"
          />

          <TextField
            value={shippingAddress.phone}
            changeHandler={e => setShippingAddress({...shippingAddress, phone: e})}
            label='Receiver Phone' type="number"
          />

          <TextField
            value={shippingAddress.address}
            changeHandler={e => setShippingAddress({...shippingAddress, address: e})}
            label='Shipping Address'
            Sx={{ marginTop: '3rem' }}
          />


        </div>

        {/* ======================= space div ======================= */}
        <div className={classes.space_div} />


        {/* ======================= space div ======================= */}
        <div className={classes.payment_div}>
          <Payment_Method
            selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod}
            paymentHanlder={submitHanlder}
            is_disabled={(!shippingAddress.address || !shippingAddress.phone)}
          />
        </div>


      </div>

    </Section>
  )

};