export type ty_dashboard_order_status = 'pending'| 'paid'| 'delivered';

export type ty_dashboard_order_item = {
  _id: string;
  order_at: string;
  status: ty_dashboard_order_status;
  total_price: number;
  total_quantity: number;
}