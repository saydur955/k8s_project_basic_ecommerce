import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as Sc } from 'mongoose';
import { Product } from './products.schema';

export interface OrderDocExtra {
  version: number;
  __v: never;
}

export type OrderDocument = HydratedDocument<Order> & OrderDocExtra;

@Schema({ _id: false }) // Disable _id for subdocuments unless needed
export class OrderItem {
  @Prop({ type: Sc.Types.ObjectId, required: true, ref: 'Product' })
  productId: Product;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  totalPrice: number;

}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({
  versionKey: 'version',
  optimisticConcurrency: true,
  timestamps: true 
})
export class Order {

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ type: Number, required: true })
  userId: number;

  @Prop({ type: String, required: true, enum: ['pending', 'paid', 'cancelled', 'shipped'], default: 'pending' })
  status: string;

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: Number, required: true, default: 0 })
  totalPaid: number;

  @Prop({ type: String, enum: ['stripe', 'paypal'] })
  paymentMethod?: string;

  @Prop({ type: Date })
  paidAt?: Date;

  // createdAt is added automatically by timestamps: true
}

export const OrderSchema = SchemaFactory.createForClass(Order);
