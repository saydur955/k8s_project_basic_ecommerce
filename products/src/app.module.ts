import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { NatsModule } from '@bivajon/common';
// import { AppService } from './app.service';
// import { AppController } from './app.controller';

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}


@Module({
  imports: [
    MongooseModule.forRoot(getEnvVar('MONGO_URI')),
    NatsModule,
    ProductsModule,
    CategoryModule,
  ],
  providers: [
  ]
})
export class AppModule {}















