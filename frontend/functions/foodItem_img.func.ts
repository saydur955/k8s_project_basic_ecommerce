type T_param = {
  src: string;
  size: 'lg'| 'sm';
}

export const foodItem_img = ({ src, size }: T_param) => {

  let img_src = src.replace('.png', '.jpg');

  if(size === 'lg') {
    img_src = `/images/food_items/large/${img_src}`
  }
  else if(size === 'sm') {
    img_src = `/images/food_items/large/${img_src}`
  }

  return img_src;

}