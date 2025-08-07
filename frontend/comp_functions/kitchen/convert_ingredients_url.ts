
export const convert_ingredients_url = (list: string[]) => {

  let query_str = '';

  list.forEach((el, idx) => {

    let newItem: string;

    if (idx === 0) {
      newItem = `ingredient=${el}`
    }
    else {
      newItem = `&ingredient=${el}`
    }

    query_str = query_str + newItem;

  });

  return query_str;

};