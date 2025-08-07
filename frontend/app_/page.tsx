import { primaryPageSummary } from '@/apiServer/controller/foods/primaryPageSummary';
// comp
import { Primary } from '@/components/primary';
import { Fetch } from '@/functions/fetch';
import { ty_FoodSummary_list } from '@/types/food.type';

const fetchData = async () => {
  try {

    const res = await Fetch<ty_FoodSummary_list>({
      url: '/foods/getCategorySummary',
      methodType: 'GET'
    });

    return res;

  }
  catch(err) {

    return null;

  }
}

export default async function Home() {

  // const foodSummary = await fetchData();
  const foodSummary = await primaryPageSummary();

  if(!foodSummary) {
    return null;
  }

  return (
    <Primary foodSummary={foodSummary} />
  )
}
