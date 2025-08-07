import { ty_page_url } from '@/types/general.type';
import { fetchData } from '@/page_template/menu/fetchData';
import { Menu_RenderComp } from '@/page_template/menu/renderComp';



export default async function CatPage({ params, searchParams }: ty_page_url) {

  const catName = params.cat;
  const subCat = params.subcat;

  const foodList = await fetchData({ 
    cat: catName, subCat: subCat,
    param: searchParams
  });

  if(!foodList) {
    return null;
  }

  return (
   <Menu_RenderComp
      foodData={foodList}
      cat={catName}
      subcat={subCat}
      param={searchParams}
   />
  )
}
