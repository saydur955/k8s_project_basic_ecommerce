import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { error_response } from '@/apiServer/controller/err_res';
// types
import { ty_food_sortType, ty_food_category } from '@/apiServer/types/food.type';
import { is_integer } from '@/functions/is_integer.func';
import { Foods } from '@/apiServer/models/food.model';
import { api_food_getAll_doc_count } from '@/apiServer/data/foods.data';


const SORT_LIST: ty_food_sortType[] = ['default', 'price_asc', 'price_desc'];

const CATEGORY_LIST: ty_food_category[] = ['burger', 'condiment', 'drink', 'ice_cream'];


export async function GET(request: NextRequest) {

  try {

    await dbConnect();

    const params = request.nextUrl.searchParams;
    
    // =================== check params ===================

    let page_param = params.get('page');
    const sort_param = params.get('sort') as ty_food_sortType|null;
    const category_param = params.get('category') as ty_food_category|null;
    const item_type_param = params.get('item_type');

    // check page
    if(
      !page_param || !is_integer(page_param) || Number(page_param) < 1 || 
      Number(page_param) > 50
    ) {
      throw new Error('invalid page number');
    }
    // check sort type
    if(!sort_param || !SORT_LIST.includes(sort_param)) {
      throw new Error('invalid sort type');
    }
    // check category
    if(!category_param || !CATEGORY_LIST.includes(category_param)) {
      throw new Error('invalid category');
    }


    // =================== check params ===================
    const skip = (Number(page_param) - 1) * api_food_getAll_doc_count;

    // sort type
    let sort_option: any = { _id: 1 };
    if (sort_param === 'price_asc') {
      sort_option = { price: 1 };
    }
    if (sort_param === 'price_desc') {
      sort_option = { price: -1 };
    }

    // get burger list
    const get_burgers = await Foods.find(
      {
        category: category_param,
        ...(item_type_param && { item_type: item_type_param })
      },
      {
        _id: 1,
        name: 1,
        image_sm: 1
      }
    )
    .sort(sort_option)
    .skip(skip)
    .limit(api_food_getAll_doc_count)
    .lean();


    return NextResponse.json(get_burgers);

  }
  catch(e) {

    return error_response(e);

  }

}