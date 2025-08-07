import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductRepository } from './product.repository';
import { ProductGetAllDTO } from './dtos/productGetAll.dto';
import { ProductCreateDTO } from './dtos/productCreate.dto';
import { MongoIdDTO } from '@bivajon/common';
import { ProductUpdateDTO } from './dtos/productUpdate.dto';

@Controller('/products')
export class ProductsController {

    constructor(
        private service: ProductsService,
        private repostory: ProductRepository
    ){}

    @Get()
    getAll(@Query() query: ProductGetAllDTO) {
        return this.repostory.getAll(query);
    }

    @Post()
    create(@Body() body: ProductCreateDTO) {
        return this.service.createOne(body);
    }


    @Get('summary')
    getSummaryProducts() {
        return this.repostory.getSummaryProducts();
    }

    @Get(':id')
    getOne(@Param() param: MongoIdDTO) {
        return this.repostory.getOne(param.id);
    }

    @Patch(':id')
    updateOne(@Param() param: MongoIdDTO, @Body() body: ProductUpdateDTO) {
        return this.service.updateOne(param.id, body);
    }

    @Delete(':id')
    deleteOne(@Param() param: MongoIdDTO) {
        return this.service.deleteOne(param.id);
    }

}
