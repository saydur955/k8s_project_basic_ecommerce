import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { error_response } from '@/apiServer/controller/err_res';
import { Foods } from '@/apiServer/models/food.model';
import { isValidObjectId } from '@/apiServer/functions/isValidObjectId';
import { stringToObjectId } from '@/apiServer/functions/stringToObjectId';


export async function GET(request: NextRequest, {params}: any) {

  try {


    await dbConnect();
    
    // check params

    const id_param = params.id;

    if(!id_param || !isValidObjectId(id_param)) {
      throw new Error('invalid food id');
    }

    // =================== check food ===================
    let targetFood = await Foods.findOne(
      { _id: id_param },
      {
        _id: 1, name: 1, category: 1, item_type: 1, price: 1, size: 1, image_lg: 1,
        image_sm: 1, discount: 1, rating_avg: 1, rating_quantity: 1,
        review_quantity: 1, ingredients: 1, title: 1, description: 1
      }
    ).lean();

    if (!targetFood) {
      throw new Error('Food not found');
    };


    const similar_foods = await Foods.aggregate([

      {
        $match: {
          category: targetFood.category,
          item_type: targetFood.item_type,
          _id: { $ne: stringToObjectId(id_param) }
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

    return NextResponse.json({
      detail: targetFood,
      similarFoods: similar_foods
    });

  }
  catch(e) {

    return error_response(e);

  }

}