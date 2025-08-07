import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { nats_subjects, NatsService } from '@bivajon/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersEvent } from './orders.event';
import { Order, OrderSchema } from './schemas/orders.schema';
import { Product, ProductSchema } from './schemas/products.schema';
import { OrdersRepository } from './orders.repository';
import { ProductRepository } from './product.repository';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],

  controllers: [OrdersController],
  providers: [
    OrdersService, OrdersEvent, OrdersRepository, ProductRepository,

    {
      provide: 'ORDER_CONSUMER_SETUP',
      useFactory: async (
        service: OrdersEvent,
        natsService: NatsService,
      ) => {
        const durableProduct = 'order-service-product-consumer';
        const durableUser = 'order-service-user-consumer';

        await natsService.createConsumer(durableProduct, nats_subjects.products);
        await natsService.consumeMessages(
          durableProduct,
          service.handleProductEvent.bind(service),
        );


        await natsService.createConsumer(durableUser, nats_subjects.users);
        await natsService.consumeMessages(
          durableUser,
          service.handleUserEvent.bind(service),
        );

        console.log('Order Service: Consumer initialized');

        return true;
      },
      inject: [OrdersEvent, NatsService],
    },
  ]
})
export class OrdersModule { }
