import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/products.schema';
import { ProductRepository } from './product.repository';
import { CategoryModule } from 'src/category/category.module';
import { ProductsEvent } from './products.event';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CategoryModule
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService, ProductRepository, ProductsEvent,
  ]
})
export class ProductsModule { }
