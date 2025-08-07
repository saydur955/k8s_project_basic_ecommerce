export type ty_ingredient_measurement = {
  shortenHeight: number;
  fadedHeight: number;
}

export type ty_ingredient_name = 
'bread_white_bun_top' | 'bread_white_bun_bottom'| 'bread_bagel_bottom' |
'bread_bagel_top'| 'bread_brioche_bun_bottom'| 'bread_brioche_bun_top'|
'bread_seeded_bun_bottom'| 'bread_seeded_bun_top'| 'bread_wholemeal_bun_bottom'|
'bread_wholemeal_bun_top'|
'cheese_processed'| 'cheese_feta'| 'cheese_mozzarella'|
'cheese_goat'| 'cheese_stilton' |
'leaf_lettuce'|
'meat_beef'|
'vegetable_onion'| 'vegetable_tomato'| 'vegetable_cucumber'|
'vegetable_mashroom'| 'vegetable_potato'| 'vegetable_capsicum'|
'vegetable_chili_pepper' |
'bread_full_white_bun' | 'bread_full_seeded_bun'| 'bread_full_brioche' | 
'bread_full_wholemeal_bun' |'bread_full_bagel';

export type ty_ingredient_category = 'Bread'| 'Cheese'| 'Leaf'| 'Meat'| 'Vegetable';

export type ty_bread_slide = 'top'| 'bottom';


export type ty_ingredient_item = {
  name: ty_ingredient_name,
  display_name: string,
  price: number,
  img: string,
  img_height: number,

  items?: {
    [key in ty_bread_slide] : {
      name: ty_ingredient_name;
      display_name: string;
      img: string;
      img_height: number;
      price: number;
    }
  }
}

// export type ty_ingredient_item = {
//   name: ty_ingredient_name,
//   display_name: string,
//   price: number,
//   img: string,
//   img_height: number,
//   items?: {
//     name: ty_ingredient_name,
//     display_name: string,
//     img: string,
//     img_height: number
//   }[]
// }

export type ty_selected_ingredient_detail = {
  name: ty_ingredient_name,
  display_name: string,
  price: number,
  img: string,
  img_height: number,
  // category: ty_ingredient_category,
}

export interface ty_ingredient_item_list {
  [key: string]: ty_ingredient_item;
}
