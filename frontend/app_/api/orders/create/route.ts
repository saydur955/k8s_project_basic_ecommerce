import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { error_response } from '@/apiServer/controller/err_res';
// types
import { ty_food_sortType, ty_food_category } from '@/apiServer/types/food.type';
import { is_integer } from '@/functions/is_integer.func';
import { isValidObjectId } from '@/apiServer/functions/isValidObjectId';
import { Orders, ty_orderSchema_itemList } from '@/apiServer/models/order.model';
import { stringToObjectId } from '@/apiServer/functions/stringToObjectId';
import { Foods } from '@/apiServer/models/food.model';
import { ty_ObjectId } from '@/apiServer/types/general.type';
import { check_ordered_burger_ingredients } from 
'@/apiServer/controller/orders/checkIngredients/checkIngredients';
import { auth_guard } from '@/apiServer/controller/auth/auth_guard';


interface T_create_order_param {
  deliver_address?: string;
  list?: {
    total_item?: number;
    food_id?: string;
    custom_ingredients?: string[];
    custom_name?: string;
  }[]
}

interface T_createOrder_calculated_food_data extends ty_orderSchema_itemList {
  total_price: number;
  total_item: number;
}

type T_get_burger_by_multiple_id_res = {
  _id: ty_ObjectId;
  calculated_price: number;
  category: ty_food_category;
}

export async function POST(request: NextRequest) {

  try {

    // ========================== check req body ==========================
    const reqBody = await request.json() as T_create_order_param;

    // check delevary address
    if (
      !reqBody.deliver_address || typeof reqBody.deliver_address !== 'string' ||
      reqBody.deliver_address.length >= 300 ||
      reqBody.deliver_address.length <= 3
    ) {
      throw new Error('invalid delevary address');
    }


    // check food list type
    if(
      !reqBody.list || !Array.isArray(reqBody.list) || 
      reqBody.list.length === 0 || reqBody.list.length > 20
      ) {
      throw new Error('invalid item list');
    }


    // check list array
    let list_has_error =  reqBody.list.find(el => {

      if(!el.total_item || !is_integer(el.total_item) || el.total_item < 1 ) return true;

      // if ingredients and burgerId both exist
      if(el.food_id && el.custom_ingredients) {
        return true;
      }

      // if ingredients and burgerId anyone not exist
      if(!el.food_id && !el.custom_ingredients) {
        return true;
      }

      // if ingredients exist but it's not array
      if (el.custom_ingredients) {
        if (!Array.isArray(el.custom_ingredients) || el.custom_ingredients.length < 1) {
          return true;
        }
        if(!el.custom_name || el.custom_name.length >= 100) {
          return true;
        }
      }

      // if burger_id exist but it's not objectID
      if(el.food_id && !isValidObjectId(el.food_id)) {
        return true;
      }

      return false;

    })
    
    if(list_has_error) {
      throw new Error('invalid item list');
    }

    await dbConnect();

    // check auth
    const authData = await auth_guard();
    

    // ===========================================================================
    // ===========================================================================
    // ===========================================================================
    // ===========================================================================

    // ============================= calculate food data
    let calculated_food_data: T_createOrder_calculated_food_data = {
      custom: [],
      pre_defined: [],
      total_price: 0,
      total_item: 0
    }

    // list of custom burger
    let custom_burger_list: 
    { ingredients: string[]; total_item: number; name: string;}[] = [];

    // list of pre defined burger
    let pre_defined_food_list: {[key: string]: number;} = {};

    reqBody.list.forEach((item: any) => {

      // check for food_id
      if (item.food_id) {

        pre_defined_food_list = {
          ...pre_defined_food_list,
          [item.food_id]: item.total_item
        }
      }
      // check for custom burger
      else if(item.custom_ingredients) {
        custom_burger_list = [
          ...custom_burger_list,
          {
            ingredients: item.custom_ingredients,
            total_item: item.total_item,
            name: item.custom_name
          }
        ]
      }

    });

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // ====================================================
    // ============================= handle pre defined food
    const food_id_list = Object.keys(pre_defined_food_list)
    .map(el => stringToObjectId(el));

    let total_oredered_Pre_burger = 0;

    if(food_id_list.length > 0) {

      const pre_defined_food_quried_data = await Foods.aggregate([
  
        {
          $match: {
            _id: {
              $in: food_id_list
            }
          }
        },
        {
          $project: {
            _id: 1,
            category: 1,
            calculated_price: {
  
              $trunc: [
                {
                  $subtract: [
                    '$price',
                    {
                      $divide: [
                        { $multiply: ['$discount', '$price'] },
                        100
                      ]
                    }
                  ]
                },
                0
              ]
  
            }
          }
        }
  
      ]) as T_get_burger_by_multiple_id_res[];

              
      // calculate for pre defined food
      pre_defined_food_quried_data.forEach(el => {
  
        const food_id = el._id.toString();
  
        const item_amount = pre_defined_food_list[food_id];
  
        if (item_amount) {
          calculated_food_data = {
            ...calculated_food_data,
            pre_defined: [
              ...calculated_food_data.pre_defined,
              {
                food_id: stringToObjectId(food_id),
                item_amount: item_amount,
                single_price: el.calculated_price
              }
            ],
            total_item: calculated_food_data.total_item + item_amount,
            total_price: calculated_food_data.total_price +
              item_amount * el.calculated_price
          }

          // check is this item is burger
          if(el.category === 'burger') {
            total_oredered_Pre_burger = total_oredered_Pre_burger + item_amount
          }
  
        }
  
      });

    }


  

    // ====================================================
    // ============================= handle created burger
    custom_burger_list.forEach(el => {

      // check ingredients
      const ingredient_calc = check_ordered_burger_ingredients(el.ingredients);

      if(ingredient_calc) {

        calculated_food_data = {
          ...calculated_food_data,
          custom: [
            ...calculated_food_data.custom,
            {
              ingredients: el.ingredients,
              item_amount: el.total_item,
              single_price: ingredient_calc.price,
              name: el.name
            }
          ],
          total_item: calculated_food_data.total_item + el.total_item,
          total_price: calculated_food_data.total_price +
          el.total_item * ingredient_calc.price
        }

      }

    });
    // ================= end of custom burger

    if(
      calculated_food_data.total_price < 1 || 
      calculated_food_data.total_item < 1
    ) {
      throw new Error('invalid data custom');
    }
    
    // check that I've order at least one burger.
    // I'm not just oder coke, ice-creas
    if(
      calculated_food_data.custom.length < 1 &&
      total_oredered_Pre_burger < 1
    ) {
      throw new Error("Can't order without any burger");
    }


    // create order
    const created_order = await Orders.create({
      user_id: stringToObjectId(authData._id),
      paid_amount: 0,
      status: 'pending',
      order_at: new Date(),
      // paid_at: null,
      total_price: calculated_food_data.total_price,
      total_quantity: calculated_food_data.total_item,
      custom: calculated_food_data.custom,
      pre_defined: calculated_food_data.pre_defined,
      deliver_address: reqBody.deliver_address
    });

    return NextResponse.json({
      status: 'success order',
      order_id: created_order._id
    });

  }
  catch(e) {

    return error_response(e);

  }

}