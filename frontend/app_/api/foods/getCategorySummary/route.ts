import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { error_response } from '@/apiServer/controller/err_res';
import { Foods } from '@/apiServer/models/food.model';


export async function GET(request: NextRequest) {

  try {


    await dbConnect();

    // =================== check food ===================
    const dataList = await Foods.aggregate([

      {
        $match: {
          on_summary: true
        }
      },
  
      {
        $group: {
          _id: '$category',
          itemList: {
            $push: {
              id: '$_id',
              name: '$name',
              price: '$price',
              title: '$title',
              image_lg: '$image_lg',
              image_sm: '$image_sm',
              description: '$description',
              size: '$size'
            }
          }
        }
      }
  
    ]);


    return NextResponse.json(dataList);

  }
  catch(e) {

    return error_response(e);

  }

}