"use client";
import { CartProvider } from '@/context/cartContext';
import { CartComp } from './Cart_Comp';
import { Page_Header } from '@/components/shared/page_header';
import { ty_page_header_nav_item } from '@/types/general.type';

const nav_list: ty_page_header_nav_item[] = [
  {
    label: 'Cart',
    link: null
  }
]



export default function CartPage() {


  return (
    <CartProvider>

      <Page_Header
        title="Your cart" nav_list={nav_list}
      />

      <CartComp />
    </CartProvider>

  )

}