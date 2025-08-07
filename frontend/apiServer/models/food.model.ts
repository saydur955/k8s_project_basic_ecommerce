import { Model, Schema, model, models } from 'mongoose';
import { ty_food_category } from '../types/food.type';

export interface ty_foodSchema {
  name: string;
  category: ty_food_category;
  item_type?: string;
  price: number;
  size: string;
  image_sm: string;
  image_lg: string;
  discount?: number;
  rating_avg?: number;
  rating_quantity: number;
  review_quantity: number;
  ingredients?: string[];
  title: string;
  description: string;
  on_summary?: boolean;
}

const FoodSchema = new Schema<ty_foodSchema>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  category: {
    type: String,
    required: true
  },
  item_type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  size: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  image_lg: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200
  },
  image_sm: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200
  },
  discount: {
    type: Number,
    max: 100,
  },
  rating_avg: {
    type: Number,
    max: 5,
  },
  rating_quantity: {
    type: Number,
    min: 0,
    required: true,
    default: 0
  },
  review_quantity: {
    type: Number,
    min: 0,
    required: true,
    default: 0
  },
  ingredients: {
    type: [String]
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  },
  on_summary: {
    type: Boolean
  }
});

FoodSchema.index({ category: 1, item_type: 1 });
FoodSchema.index({ price: 1 });
FoodSchema.index({ on_summary: 1 });

export const Foods: Model<ty_foodSchema> = models.Food ||
model<ty_foodSchema>('Food', FoodSchema);