import Image from "next/image";
import styles from "./page.module.css";
import { Fetch } from "@/functions/fetch";
import { ty_category_item, ty_FoodSummary_list } from "@/types/food.type";
import { notFound } from "next/navigation";
import { Primary } from "@/components/primary";

export default async function Home() {

  let categoryList: ty_category_item[] = [];
  let foodSummary: ty_FoodSummary_list = [];

  try {

    foodSummary = await Fetch<ty_FoodSummary_list>({
      url: "/products/summary",
    });

    // categoryList = await Fetch<ty_category_item[]>({
    //   url: '/category'
    // })

  }
  catch {

    return notFound();

  }


  return (
    <Primary foodSummary={foodSummary} />
  )

}
