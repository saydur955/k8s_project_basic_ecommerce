import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as Sc } from 'mongoose';

export interface ProductDocExtra {
  version: number;
  __v: never;
}

export type ProductDocument = HydratedDocument<Product> & ProductDocExtra;

@Schema({
  versionKey: 'version',
  optimisticConcurrency: true,

})
export class Product {

  @Prop({
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  })
  name: string;

  @Prop({
    type:  [Sc.Types.ObjectId],
    required: true,
    ref: 'Category'
  })
  categories: string[];
  // category: Sc.Types.ObjectId;


  @Prop({
    type: Number,
    required: true,
    min: 0
  })
  price: number; // actual price. user need to pay


  @Prop({
    type: Number,
    required: true,
    min: 0
  })
  priceToShow: number; // price will be shown as the price, before discounted


  @Prop({
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  })
  size: string;

  @Prop({
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000
  })
  image: string;


  // @Prop({
  //   type: Number,
  //   max: 100,
  //   min: 0
  // })
  // discount?: number;

  @Prop({
    type: Number,
    max: 5,
    min: 0
  })
  rating_avg?: number;

  @Prop({
    type: Number,
    min: 0,
    required: true,
    default: 0
  })
  rating_quantity: number;

  @Prop({
    type: Number,
    min: 0,
    required: true,
    default: 0
  })
  review_quantity: number;

  @Prop({
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500
  })
  subtitle: string;

  @Prop({
    type: String,
    required: true,
    minlength: 5,
    maxlength: 5000
  })
  description: string;

  @Prop({
    type: Boolean
  })
  on_summary?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
