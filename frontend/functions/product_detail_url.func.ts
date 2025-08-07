type T_param = {
  id: string;
  name: string;
}

export const product_detail_url_generator = ({ id, name }: T_param) => {

  const name_str = name.split(' ').join('-').toLowerCase();

  return `/product/${name_str}/${id}`;

}