import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/products.schema';
import { ProductGetAllDTO } from './dtos/productGetAll.dto';
import { ProductCreateDTO } from './dtos/productCreate.dto';
import { CategoryRepository } from 'src/category/category.repository';
import { ProductUpdateDTO } from './dtos/productUpdate.dto';


@Injectable()
export class ProductRepository {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private categoryRepo: CategoryRepository
  ) { }


  async getAll(query: ProductGetAllDTO) {

    let page = query.page || 1;
    const limit = 25;

    const skip = (page - 1) * limit;

    // sort type
    let sort_option: any = { _id: 1 };
    switch (query.sort) {
      case 'price_asc':
        sort_option = { price: 1 };
      case 'price_desc':
        sort_option = { price: -1 };
      default:
        sort_option = { _id: 1 };
    }

    // get category id by the slug
    const targetCategory = await this.categoryRepo.getBySlug(query.categorySlug);


    if (!targetCategory) {
      return [];
    }

    const productList = await this.productModel.find(
      {
        categories: targetCategory._id,
        ...(query.item_type && { item_type: query.item_type })
      },
      {
        _id: 1,
        name: 1,
        image: 1
      }
    )
      .sort(sort_option)
      .skip(skip)
      .limit(limit)
      .lean();

    return productList;
  }


  async getOne(id: Types.ObjectId) {

    const targetDoc = await this.productModel.findOne(
      { _id: id }
    ).exec();

    if(!targetDoc) {
      throw new NotFoundException('Product not found');
    }

    const relatedDocs = await this.productModel.aggregate([

      {
        $match: {
          categories: { $in: targetDoc.categories },
          _id: { $ne: targetDoc._id }
        }
      },
      { 
        $sample : { size: 4 } 
      },
      {
        $project: {
          _id: 1, name: 1, image_sm: 1
        }
      }

    ]);

    return {
      detail: targetDoc,
      similarFoods: relatedDocs
    }

  }


    async getOne_prev(id: Types.ObjectId) {

    const targetDoc = await this.productModel.aggregate([

      {
        $match: {
          _id: id
        }
      },

      // {
      //     $addFields: {
      //       id: "$_id"
      //     }
      //   },
        {
          $project: {
            on_summary: 0, categories: 0
          }
        }

      // {
      //   $lookup: {
      //     from: this.categoryRepo.collectionName,
      //     let: {
      //       catId: '$categoryId'
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $eq: [
      //               '$_id',
      //               '$$catId'
      //             ]
      //           }
      //         }
      //       },
      //       {
      //         $project: {
      //           _id: 1, name: 1
      //         }
      //       }
      //     ],
      //     as: 'categoryData'
      //   }
      // },
      // {
      //   $set: {
      //     categoryData: { $arrayElemAt: ['$categoryData', 0] },
      //   },
      // },
      // {
      //   $set: {
      //     category: { $ifNull: ['$categoryData', null] },
      //   },
      // },
      // {
      //   $project: {
      //     categoryData: 0, categoryId: 0
      //   }
      // }

    ])

    if (targetDoc.length !== 1) {
      throw new NotFoundException('Product not found');
    }

    return targetDoc[0];

  }


  async createOne(reqBody: ProductCreateDTO) {

    const existedCategory = await this.categoryRepo.getCategories(reqBody.categories);

    if (existedCategory.length !== reqBody.categories.length) {
      throw new BadRequestException('Invalid category');
    }

    const createdDoc = new this.productModel({
      ...reqBody,
    });

    const savedDoc = await createdDoc.save();

    return savedDoc;

  }


  // async updateOne(id: Types.ObjectId, reqBody: ProductUpdateDTO) {

  //   const targetDoc = await this.productModel.findById(id).exec();

  //   if(!targetDoc) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   Object.keys(reqBody).forEach(el => {

  //     const val = reqBody[el];

  //     if(val === undefined) return;
  //     targetDoc[el] = val;
  //   })

  //   // targetDoc.price = reqBody.price;

  //   // targetDoc.set(reqBody);

  //   // targetDoc.set({
  //   //   ...targetDoc,
  //   //   ...reqBody
  //   // });

  //   const savedDoc = await targetDoc.save();

  //   return savedDoc;

  //   // const updatedData = await this.productModel.findByIdAndUpdate(
  //   //   id,
  //   //   {
  //   //     $set: reqBody
  //   //   },
  //   //   {
  //   //     new: true
  //   //   }
  //   // )

  //   // return updatedData;

  // }


  async updateOne(id: Types.ObjectId, reqBody: ProductUpdateDTO) {

    const targetDoc = await this.productModel.findById(id).exec();

    if (!targetDoc) {
      throw new NotFoundException('Product not found');
    }

    if (reqBody.categories) {

      const existedCategory = await this.categoryRepo.getCategories(reqBody.categories);

      if (existedCategory.length !== reqBody.categories.length) {
        throw new BadRequestException('Invalid category');
      }

    }

    Object.keys(reqBody).forEach(el => {

      const val = reqBody[el];

      if (val === undefined) return;
      targetDoc[el] = val;
    })


    /*
      =========== you MUST HAVE check that condition that - if product is updated or not. 
      if product is not updated, then the version/__v will be remain same.
      for that, the order consumer won't find that product. cause order comuser will query product for updated version.
      for that consumer error nats will keep send that updated event, but it won't never be acknowledged.
      ================
    */
    if (!targetDoc.isModified()) {
      throw new BadRequestException('No updated value is provided');
    }

    const savedDoc = await targetDoc.save();
    return savedDoc;

  }



  async deleteOne(id: Types.ObjectId) {

    const deletedRes = await this.productModel.findByIdAndDelete(id);

    if (!deletedRes) {
      throw new NotFoundException('Failed to delete product');
    }

    return {
      message: 'Product deleted'
    }

  }


  async getSummaryProducts() {

    const dataList = await this.productModel.aggregate([

      {
        $match: {
          on_summary: true
        }
      },

      {
        $unwind: '$categories'
      },

      {
        $group: {
          _id: '$categories',
          itemList: {
            $push: {
              id: '$_id',
              name: '$name',
              price: '$price',
              // title: '$title',
              image: '$image',
              description: '$description',
              size: '$size',
              subtitle: '$subtitle'
            }
          }
        }
      },
      {
        $lookup: {
          from: this.categoryRepo.collectionName,
          localField: '_id',
          foreignField: '_id',
          as: 'categroydata'
        }
      },

      {
        $unwind: {
          path: '$categroydata',
          // preserveNullAndEmptyArrays: true
        }
      },

      {
        $match: {
          $or: [
            { 'categroydata.parentCategory': null },
            { 'categroydata.parentCategory': { $exists: false } },
          ]
        }
      },

      {
        $sort: {
          'categroydata.order': 1
        }
      },

      {
        $project: {
          _id: '$categroydata.slug',
          categoryName: '$categroydata.name',
          itemList: 1,
          // categoryName: '$categroydata.name'
        }
      }

    ]);

    return dataList;

  }


}
