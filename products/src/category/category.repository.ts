import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CategoryCreateDTO } from './dtos/categoryCreate.dto';
import { CategoryUpdateDTO } from './dtos/categoryUpdate.dto';


@Injectable()
export class CategoryRepository {

  constructor(
    @InjectModel(Category.name) private categroyModel: Model<Category>
  ) { }

  // get category with 1 level childrens
  async getAll() {

    const collectionName = this.categroyModel.collection.name;


    // const queryList = await this.categroyModel.find(
    //   {},
    //   { _id: 1, name: 1 }
    // )
    //   .sort('order')
    //   .lean();
    // return queryList;

    const docList = await this.categroyModel.aggregate([

      {
        $match: {
          $or: [
            { parentCategory: null },
            { parentCategory: { $exists: false } }
          ]
        }
      },

      {
        $sort: {
          order: 1
        }
      },

      {
        $lookup: {
          from: collectionName,
          let: { id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$parentCategory', '$$id']
                }
              }
            },
            {
              $project: {
                _id: '$slug', name: 1
              }
            },
            {
              $sort: {
                order: 1
              }
            }
          ],
          as: 'children'
        }
      },

      {
        $project: {
          _id: '$slug', name: 1, children: 1
        }
      }


    ]);

    return docList;

  }


  async getOne(id: Types.ObjectId) {
    const docOne = await this.categroyModel.findOne({ _id: id }).lean();
    if (!docOne) return null;
    return docOne;
  }


  // async create(reqBody: CategoryCreateDTO) {

  //   await this.categroyModel.create({
  //     name: reqBody.name
  //   });

  //   return {
  //     message: 'Category created'
  //   }

  // }


  // async updateOne(id: Types.ObjectId, reqBody: CategoryUpdateDTO) {

  //   const updatedData = await this.categroyModel.findByIdAndUpdate(
  //     id,
  //     {
  //       $set: reqBody
  //     },
  //     {
  //       new: true
  //     }
  //   )

  //   if (!updatedData) {
  //     throw new BadRequestException('Failed to update');
  //   }

  //   return updatedData;

  // }


  async deleteOne(id: Types.ObjectId) {

    const deleteData = await this.categroyModel.deleteOne(
      { _id: id }
    );

    if (deleteData.deletedCount < 1) {
      throw new BadRequestException('Failed to delete');
    }

    // const deleteData = await this.categroyModel.findByIdAndDelete(id);

    // if (!deleteData) {
    //   throw new BadRequestException('Failed to delete');
    // }

    return {
      message: 'Category deleted'
    }

  }

  get collectionName() {
    return this.categroyModel.collection.name;
  }


  async createOne(reqBody: CategoryCreateDTO) {

    const slugExist = await this.getBySlug(reqBody.slug);

    if (slugExist) {
      throw new BadRequestException('Slug already exist');
    }

    const level = reqBody.parentCategory
      ? await this.calculateLevel(reqBody.parentCategory)
      : 0;

    const createdCategory = new this.categroyModel({
      ...reqBody,
      level
    });

    // Validate circular reference
    await this.validateNoCircularReference(
      createdCategory._id,
      createdCategory.parentCategory
    );

    return createdCategory.save();
  }


  async update(id: Types.ObjectId, reqBody: CategoryUpdateDTO) {

    // Get existing category
    const existingCategory = await this.categroyModel.findById(id).exec();
    if (!existingCategory) {
      throw new Error('Category not found');
    }


    // check slug
    if (reqBody.slug && existingCategory.slug !== reqBody.slug) {

      const slugExist = await this.getBySlug(reqBody.slug);

      if (slugExist) {
        throw new BadRequestException('Slug already exist');
      }

    }


    // Calculate new level if parent is being changed
    let level = existingCategory.level;
    if (reqBody.parentCategory !== undefined) {
      level = reqBody.parentCategory
        ? await this.calculateLevel(reqBody.parentCategory)
        : 0;
    }

    // Validate circular reference if parent is being changed
    if (reqBody.parentCategory !== undefined) {
      await this.validateNoCircularReference(
        existingCategory._id,
        reqBody.parentCategory
      );
    }

    // Update category
    const updatedCategory = await this.categroyModel
      .findByIdAndUpdate(
        id,
        { ...reqBody, level },
        { new: true }
      )
      .exec();

    if (!updatedCategory) {
      throw new NotFoundException('Failed to update');
    }

    // Update descendants if parent changed
    if (reqBody.parentCategory !== undefined) {
      await this.updateDescendantLevels(updatedCategory);
    }

    return updatedCategory;
  }

  private async calculateLevel(parentId: Types.ObjectId | null): Promise<number> {

    if (!parentId) return 0;

    const parent = await this.categroyModel.findById(parentId).exec();
    if (!parent) throw new Error('Parent category not found');
    return parent.level + 1;
  }

  private async validateNoCircularReference(
    categoryId: Types.ObjectId,
    parentId: Types.ObjectId | null
  ): Promise<void> {

    if (!parentId) return;

    // Check direct self-reference
    if (categoryId.equals(parentId)) {
      throw new Error('Category cannot be its own parent');
    }

    // Check multi-level circular references
    let currentParentId = parentId;
    while (currentParentId) {
      const parent = await this.categroyModel.findById(currentParentId).exec();

      if (!parent || !parent.parentCategory) break;

      if (parent._id.equals(categoryId)) {
        throw new Error('Circular reference detected in category hierarchy');
      }
      currentParentId = parent.parentCategory;
    }
  }

  private async updateDescendantLevels(parentCategory: CategoryDocument): Promise<void> {

    const children = await this.categroyModel.find({
      parentCategory: parentCategory._id
    }).exec();

    for (const child of children) {
      child.level = parentCategory.level + 1;
      await child.save();
      await this.updateDescendantLevels(child);
    }
  }


  async getBySlug(slug: string) {

    const targetCategory = await this.categroyModel.findOne({ slug });

    return targetCategory;

  }


  async getCategories(ids: string[]) {

    const docList = await this.categroyModel.find(
      {
      _id: { $in: ids }
      },
      {
        _id: 1
      }
  ).lean().exec();

    return docList;


  }


}
