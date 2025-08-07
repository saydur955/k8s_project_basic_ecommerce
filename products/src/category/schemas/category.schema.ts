import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  versionKey: 'version',
  optimisticConcurrency: true
})
export class Category {

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true
  })
  slug: string;

  @Prop({
    type: Types.ObjectId,
    default: null
  })
  parentCategory: Types.ObjectId | null;

  @Prop({
    type: Number,
    default: 0
  })
  level: number;

  @Prop({
    type: Number,
    required: true,
    min: 1
  })
  order: number;
  
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ slug: 1 }, { unique: true });
