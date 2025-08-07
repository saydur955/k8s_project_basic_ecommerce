import { Additional } from "@/components/foods/details/additional";
import { FoodDetailUI } from "@/components/foods/details/detailUI";
import { RelatedItems } from "@/components/foods/details/relatedItems";
import { Fetch } from "@/functions/fetch";
import { ty_food_one_detail } from "@/types/food.type";
import { ty_page_url } from "@/types/general.type";
import { Fragment } from "react";


const fetchData = async (id: string) => {
  try {

    const res = await Fetch<any>({
      url: `/foods/${id}`,
      methodType: 'GET'
    });

    return res;

  }
  catch(err) {
    return null;
  }
}

export default async function FoodDetailPage({ params }: ty_page_url) {


  const foodData = await fetchData(params.id);

  return (
    <Fragment>

      <FoodDetailUI item={{...foodData.detail, id: foodData.detail._id}} />

      {/* <Additional /> */}

      <RelatedItems list={foodData.similarFoods} />

    </Fragment>
  )

}