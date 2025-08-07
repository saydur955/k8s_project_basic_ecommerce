import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductModel } from "./schemas/products.schema";
import { EventGeneralMongoId, EventProductCreated } from "@bivajon/common";
import { InjectModel } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Injectable()
export class ProductRepository {

  constructor(
    @InjectModel(Product.name) private productModel: ProductModel,
  ) { }

  public async createProduct(productData: EventProductCreated) {

    const createdDoc = await this.productModel.create({
      ...productData
    })

    await createdDoc.save();

  }

  public async updateProduct(productData: EventProductCreated) {

    const updatedDoc = await this.productModel.updateByVersionId(productData);

    if (!updatedDoc) {
      throw new Error('Product not found');
    }


    // const targetDoc = await this.productModel.findByVersionId({
    //   _id: productData._id, version: productData.version
    // })

    // if (!targetDoc) {
    //   console.log('product not found')
    //   throw new Error('Product not found');
    // }

    // targetDoc.name = productData.name;
    // targetDoc.price = productData.price;
    // targetDoc.image = productData.image;

    // const saved = await targetDoc.save();

    // console.log(saved);

  }


  public async deleteProduct(productData: EventGeneralMongoId) {

    await this.productModel.findByIdAndDelete(productData._id);

  }


}
