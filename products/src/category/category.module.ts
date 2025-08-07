import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { Category, CategorySchema } from './schemas/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoryModule {}


// https://chat.deepseek.com/a/chat/s/98723bc9-e1b1-494b-928c-a2443528ee0b
