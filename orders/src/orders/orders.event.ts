import { EventProductCreated, EventUserCreated, nats_msg, nats_subject, NatsService } from "@bivajon/common";
import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { ProductRepository } from "./product.repository";

@Injectable()
export class OrdersEvent {

  constructor(
    // private readonly natsService: NatsService,
    private productRepository: ProductRepository
  ) { }

  // public async handleProductEvent(subject: nats_subject, data: any, msg: nats_msg) {

  //   console.log(`orderService - productEvent: ${subject}`);

  //   // Business logic based on order events
  //   switch (subject) {
  //     case nats_subject.productCreated:
  //       await this.handleProductCreate(data, msg);
  //       break;
  //     case nats_subject.productUpdated:
  //       await this.handleProductUpdate(data, msg);
  //       break;
  //     default:
  //       console.log(`Unknown product event type: ${subject}`);
  //   }
  // }


  public async handleProductEvent(subject: nats_subject, data: any, msg: nats_msg) {

    console.log(`orderService - productEvent: ${subject}`);

    if (subject === nats_subject.productCreated) {
      await this.productRepository.createProduct(data);
    }
    else if (subject === nats_subject.productUpdated) {
      await this.productRepository.updateProduct(data);
    }
    else if (subject === nats_subject.productDeleted) {
      await this.productRepository.deleteProduct(data)
    }

  }


  public async handleUserEvent(subject: nats_subject, data: any) {

    console.log(`orderService - userEvent: ${subject}`);

    // // Business logic based on order events
    // switch (subject) {
    //   case nats_subject.userCreated:
    //     await this.handleNewUser(data);
    //     break;
    //   // case nats_subject.orderUpdated:
    //   //   await this.handleOrderUpdate(data);
    //   //   break;
    //   default:
    //     console.log(`Unknown user event type: ${subject}`);
    // }

  }


  // private async handleProductCreate(data: EventProductCreated, msg: nats_msg) {

  //   await this.productRepository.createProduct(data);

  // }


  // private async handleProductUpdate(data: EventProductCreated, msg: nats_msg) {
  //   await this.productRepository.updateProduct(data);
  // }


}
