import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryCreateDTO } from './dtos/categoryCreate.dto';
import { CategoryUpdateDTO } from './dtos/categoryUpdate.dto';
import { MongoIdDTO } from '@bivajon/common'

@Controller('category')
export class CategoryController {

  constructor(
    private repository: CategoryRepository
  ){}

  @Get()
  getAll() {
    return this.repository.getAll();
  }

  @Post()
  create(@Body() reqBody: CategoryCreateDTO) {
    return this.repository.createOne(reqBody);
  }

  @Patch(':id')
  updateOne(@Param() params: MongoIdDTO , @Body() body: CategoryUpdateDTO) {

    return this.repository.update(params.id, body);
  }

  @Delete(':id')
  deleteOne(@Param() params: MongoIdDTO ) {

    return this.repository.deleteOne(params.id);
  }


}


