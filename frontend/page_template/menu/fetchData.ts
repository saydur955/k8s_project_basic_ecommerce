import { Fetch } from "@/functions/fetch";
import { is_integer } from "@/functions/is_integer.func";
import { ty_menu_foodList_item } from "@/types/food.type";
import { ty_page_params } from "@/types/general.type";
import { MENU_PAGE_PARAM } from "./menuData";

type T_param = {
  cat: string;
  param: ty_page_params;
}

export const fetchData = async ({ cat, param }: T_param) => {
  try {

    let sort = null;

    let currentPage = 1;

    // handle page
    if(
      param.hasOwnProperty(MENU_PAGE_PARAM) && 
      typeof param[MENU_PAGE_PARAM] === 'string' &&
      is_integer(param[MENU_PAGE_PARAM]) &&
      Number(param[MENU_PAGE_PARAM]) > 1
    ) {
      currentPage = Number(param[MENU_PAGE_PARAM])
    }

    let url = `/products?categorySlug=${cat}&page=${currentPage}`;

    // // check page
    // url = (page && is_integer(page) && page > 0) ? 
    // `${url}&page=${page}`: `${url}&page=1`;

    // check sort
    url = sort ? `${url}&sort=${sort}`: `${url}&sort=default`;


    const res = await Fetch<ty_menu_foodList_item[]>({
      url: url,
      methodType: 'GET'
    });

    return res;

  }
  catch(err) {
    return null;
  }
}