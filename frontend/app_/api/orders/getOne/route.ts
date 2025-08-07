import { auth_guard } from '@/apiServer/controller/auth/auth_guard';
import { error_response } from '@/apiServer/controller/err_res';
import { isValidObjectId } from '@/apiServer/functions/isValidObjectId';
import { stringToObjectId } from '@/apiServer/functions/stringToObjectId';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Orders } from '@/apiServer/models/order.model';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

  try {

    // check auth
    const authData = await auth_guard();

    const searchParams = request.nextUrl.searchParams;

    // page param
    const id_param = searchParams.get('id');

    if (!id_param || !isValidObjectId(id_param)) {
      throw new Error('Invalid order');
    }

    await dbConnect();

    const orderDetail = await Orders.aggregate([

      {
        $match: {
          _id: stringToObjectId(id_param),
          user_id: stringToObjectId(authData._id)
        }
      },

      {
        $addFields: {
          pre_defined_len: {
            $size: '$pre_defined'
          }
        }
      },

      {
        // $unwind: '$pre_defined',
        $unwind: {
          path: '$pre_defined',
          preserveNullAndEmptyArrays: true
        }

      },

      {
        $lookup: {
          from: 'foods',
          let: { foodId: '$pre_defined.food_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$foodId', '$_id']
                }
              }
            },
            {
              $project: {
                _id: 1, name: 1, image_sm: 1
              }
            }
          ],
          as: 'foodData'
        }
      },

      // check predefined items
      {
        $match: {
          $or: [

            {
              $and: [
                { pre_defined_len: { $gt: 0 } },
                { foodData: { $size: 1 } }
              ]
            },

            { pre_defined_len: 0 }

          ]
        }
      },

      // check custom item 
      {
        $match: {
          $or: [
            { 'custom.0': { $exists: true } },
            { foodData: { $size: 1 } }
          ]
        }
      },

      {
        $addFields: {
          pre_defined: {

            $cond: {

              if: {
                $eq: [
                  { $size: '$foodData' },
                  1
                ] 
              },

              then: {
                $mergeObjects: [
                  { $arrayElemAt: ["$foodData", 0] }, "$pre_defined"
                ]
              },

              else: null

            }

          }
        }
      },

      // {
      //   $addFields: {
      //     test_pre_defined: {
      //       $mergeObjects: [ 
      //         { $arrayElemAt: [ "$foodData", 0 ] }, "$pre_defined" 
      //       ]
      //     }
      //   }
      // },


      {
        $group: {
          _id: '$_id',
          pre_defined: { $push: '$pre_defined' },
          custom: { $first: '$custom' },

          user_id: { $first: '$user_id' },
          total_quantity: { $first: '$total_quantity' },
          total_price: { $first: '$total_price' },
          paid_amount: { $first: '$paid_amount' },
          status: { $first: '$status' },
          order_at: { $first: '$order_at' },
          deliver_address: { $first: '$deliver_address' },
          
        }

      },


      // filter needed fields
      {
        $project: {
          _id: 1, user_id: 1, total_quantity: 1, total_price: 1, paid_amount: 1,
          status: 1, order_at: 1, deliver_address: 1, custom: 1,
          pre_defined: {
            $cond: {
              if: {
                $eq: [
                  {
                    $arrayElemAt: ['$pre_defined', 0]
                  },
                  null
                ]
              },
              then: [],
              else: '$pre_defined'
            }
          }
        }
      },



    ]);

    if (!orderDetail[0]) {
      throw new Error('Order not found');
    }

    return NextResponse.json(orderDetail[0]);

  }
  catch (err) {

    return error_response(err);

  }

}