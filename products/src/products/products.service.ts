import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ProductCreateDTO } from './dtos/productCreate.dto';
import { ProductsEvent } from './products.event';
import { ProductRepository } from './product.repository';
import { ProductUpdateDTO } from './dtos/productUpdate.dto';

@Injectable()
export class ProductsService {

    constructor(
        private repository: ProductRepository,
        private event: ProductsEvent,
    ) { }


    getAll() {
        return {
            message: 'Product list'
        }
    }

    async createOne(reqBody: ProductCreateDTO) {

        // validate category
        if (new Set(reqBody.categories).size !== reqBody.categories.length) {
            throw new BadRequestException('Invalid category');
        }

        const createdProduct = await this.repository.createOne(reqBody);

        await this.event.publishCreateProduct(createdProduct);

        return createdProduct;

    }


    async updateOne(id: Types.ObjectId, reqBody: ProductUpdateDTO) {

        if (reqBody.categories) {

            if (new Set(reqBody.categories).size !== reqBody.categories.length) {
                throw new BadRequestException('Invalid category');
            }

        }

        const updatedProduct = await this.repository.updateOne(id, reqBody);

        await this.event.publishUpdateProduct(updatedProduct);

        return updatedProduct;

    }


    async deleteOne(id: Types.ObjectId) {

        const deleteRes = await this.repository.deleteOne(id);

        await this.event.publishDeleteProduct(id);

        return deleteRes;

    }



}
