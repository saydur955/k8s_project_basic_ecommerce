import { Module } from '@nestjs/common';
import { getEnvVar, NatsModule } from '@bivajon/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    MongooseModule.forRoot(getEnvVar('MONGO_URI')),
    OrdersModule, 
    NatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
