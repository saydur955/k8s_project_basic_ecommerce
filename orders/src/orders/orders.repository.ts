import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument, ProductModel } from "./schemas/products.schema";
import { Order, OrderDocument } from "./schemas/orders.schema";

@Injectable()
export class OrdersRepository {

  constructor(
    // @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    // @InjectModel(Product.name) private productModel: ProductModel,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) { }




}
