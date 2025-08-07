import { EventProductCreated } from '@bivajon/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { HydratedDocument, Types, Schema as Sc } from 'mongoose';

export interface ProductDocExtra {
  version: number;
  __v: never;
  // findByVersionId: (query: { _id: string; version: number }) => Product;
}

export type ProductDocument = HydratedDocument<Product> & ProductDocExtra;

@Schema({
  versionKey: 'version',
  optimisticConcurrency: true
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
    type: Number,
    required: true,
    min: 0
  })
  price: number;

  @Prop({
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000
  })
  image: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);


// Static method
ProductSchema.statics.findByVersionId = function (query: { _id: string; version: number }) {
  return this.findOne({
    _id: query._id,
    version: query.version - 1,
  });
};

ProductSchema.statics.updateByVersionId = function (query: EventProductCreated) {
  return this.findOneAndUpdate(
    {
      _id: query._id,
      version: query.version - 1,
    },
    {
      $set: {
        name: query.name,
        price: query.price,
        image: query.image,
        version: query.version
      }
    }
  );
};

interface ProductModel extends Model<ProductDocument> {
  findByVersionId(event: { _id: string; version: number }): Promise<ProductDocument>;
  updateByVersionId(query: EventProductCreated): Promise<ProductDocument>;
}


export { ProductModel };
