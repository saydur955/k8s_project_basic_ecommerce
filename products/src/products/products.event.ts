import { Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { nats_subject, NatsService } from '@bivajon/common';
import { ProductCreateDTO } from "./dtos/productCreate.dto";
import { Product, ProductDocument } from "./schemas/products.schema";

@Injectable()
export class ProductsEvent {

  constructor(private readonly natsService: NatsService) { }


  public async handleOrderEvent(subject: nats_subject, data: any) {
    console.log('[ProductsService] Order event received:', subject, data);


    // Business logic based on order events
    switch (subject) {
      case nats_subject.orderCreated:
        await this.handleNewOrder(data);
        break;
      case nats_subject.orderUpdated:
        await this.handleOrderUpdate(data);
        break;
      default:
        console.log(`Unknown order event type: ${subject}`);
    }
  }



  private async handleNewOrder(order: any) {
    // console.log('Handling new order in product service:', order);
    // Example: Update product inventory
    // await this.updateInventory(order.items);
  }

  private async handleOrderUpdate(update: any) {
    // console.log('Handling order update in product service:', update);
    // Example: Handle canceled orders to restore inventory
  }


  public async publishCreateProduct(product: ProductDocument) {

    await this.natsService.publish(nats_subject.productCreated, {
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      version: product.version
    });

  }



  public async publishUpdateProduct(product: ProductDocument) {

    await this.natsService.publish(nats_subject.productUpdated, {
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      version: product.version
    });

  }


  public async publishDeleteProduct(id: Types.ObjectId) {

    await this.natsService.publish(nats_subject.productDeleted, {
      _id: id.toString()
    });

  }


}
