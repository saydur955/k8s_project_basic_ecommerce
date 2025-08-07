import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Foods } from '@/apiServer/models/food.model';


export const primaryPageSummary = async () => {

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


    return JSON.parse(JSON.stringify(dataList));

  }
  catch(e) {

    return null;

  }

}