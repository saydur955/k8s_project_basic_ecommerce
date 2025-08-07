import { Schema, model, models, Document, Model } from 'mongoose';

import { ty_ObjectId } from '../types/general.type';
import { ty_order_status } from '../types/order.type';

export interface ty_orderSchema_itemList {
  pre_defined: {
    food_id: ty_ObjectId;
    item_amount: number;
    single_price: number;
  }[];
  custom: {
    ingredients: string[];
    item_amount: number;
    single_price: number;
    name: string;
  }[];
}

interface TOrderSchema extends ty_orderSchema_itemList {
  user_id: Schema.Types.ObjectId;
  total_quantity: number;
  total_price: number;
  paid_amount: number;
  status: ty_order_status;
  order_at: Date;
  paid_at: Date|null;
  deliver_address: string;
}

const orderSchema = new Schema<TOrderSchema>({

  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  total_quantity: {
    type: Number,
    required: true,
    min: 1
  },
  total_price: {
    type: Number,
    required: true,
    min: 1
  },
  paid_amount: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: [
      'pending', 'paid', 'delivered'
    ],
    required: true,
    default: 'pending'
  },
  order_at: {
    type: Date,
    required: true
  },
  paid_at: {
    type: Date
  },
  deliver_address: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300
  },
  pre_defined: [ // burgers that are exist on the burger collection
    {
      food_id: Schema.Types.ObjectId,
      item_amount: Number,
      single_price: Number
    }
  ],
  custom:[ // brugers that are created by the users
    {
      ingredients: [String],
      item_amount: Number,
      single_price: Number,
      name: String
    }
  ]

});

export const Orders: Model<TOrderSchema> = models.Order || 
model<TOrderSchema>('Order', orderSchema);

orderSchema.index({ user_id: 1 });
orderSchema.index({ order_at: -1 });


