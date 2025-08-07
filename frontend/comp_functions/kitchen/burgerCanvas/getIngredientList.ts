import { Ingredient } from '../../../burgerBlueprint/01_ingredient';

// ============================== Bread ==============================
import { Bread_White_Bun_Bottom, bread_white_bun_bottom_measurement }
  from '../../../burgerBlueprint/bread/white_bun_bottom';
import { Bread_White_Bun_Top, bread_white_bun_top_measurement }
  from '../../../burgerBlueprint/bread/white_bun_top';
import { Bread_Bagel_Bottom, bread_bagel_bottom_measurement }
  from '../../../burgerBlueprint/bread/bagel_bottom';
import { Bread_Bagel_Top, bread_bagel_top_measurement }
  from '../../../burgerBlueprint/bread/bagel_top';
import { Bread_Brioche_Bun_Bottom, bread_brioche_bun_bottom_measurement }
  from '../../../burgerBlueprint/bread/brioche_bun_bottom';
import { Bread_Brioche_Bun_Top, bread_brioche_bun_top_measurement }
  from '../../../burgerBlueprint/bread/brioche_bun_top';
import { Bread_Seeded_Bun_Bottom, bread_seeded_bun_bottom_measurement }
  from '../../../burgerBlueprint/bread/seeded_bun_bottom';
import { Bread_Seeded_Bun_Top, bread_seeded_bun_top_measurement }
  from '../../../burgerBlueprint/bread/seeded_bun_top';
import { Bread_Wholemeal_Bun_Bottom, bread_wholemeal_bun_bottom_measurement }
  from '../../../burgerBlueprint/bread/wholemeal_bun_bottom';
import { Bread_Wholemeal_Bun_Top, bread_wholemeal_bun_top_measurement }
  from '../../../burgerBlueprint/bread/wholemeal_bun_top';

// ============================== Meat ==============================
import { Meat_Beef, meat_beef_measurement }
  from '../../../burgerBlueprint/meat/beef';

// ============================== Cheese ==============================
import { Cheese_Processed, cheese_processed_measurement }
  from '../../../burgerBlueprint/cheese/processed';
import { Cheese_Feta, cheese_feta_measurement }
  from '../../../burgerBlueprint/cheese/feta';
import { Cheese_Mozzarella, cheese_mozzarella_measurement }
  from '../../../burgerBlueprint/cheese/mozzarella';
import { Cheese_Goat, cheese_goat_measurement }
  from '../../../burgerBlueprint/cheese/goat';
import { Cheese_Stilton, cheese_stilton_measurement }
  from '../../../burgerBlueprint/cheese/stilton';

// ============================== vegetable ==============================
import { Vegetable_Onion, vegetable_onion_measurement }
  from '../../../burgerBlueprint/vegetable/onion';
import { Vegetable_Tomato, vegetable_tomato_measurement }
  from '../../../burgerBlueprint/vegetable/tomato';
import { Vegetable_Cucumber, vegetable_cucumber_measurement }
  from '../../../burgerBlueprint/vegetable/cucumber';
import { Vegetable_Mashroom, vegetable_mashroom_measurement }
  from '../../../burgerBlueprint/vegetable/mashroom';
import { Vegetable_Potato, vegetable_potato_measurement }
  from '../../../burgerBlueprint/vegetable/potato';
import { Vegetable_Capsicum, vegetable_capsicum_measurement }
  from '../../../burgerBlueprint/vegetable/capsicum';
import { Vegetable_Chili_Pepper, vegetable_chili_pepper_measurement }
  from '../../../burgerBlueprint/vegetable/chili_pepper';
// ============================== leaf ==============================
import { Leaf_Lettuce, leaf_lettuce_measurement }
  from '../../../burgerBlueprint/leaf/lettuce_leaf';

// ============================== types
import { ty_ingredient_name, ty_ingredient_measurement }
  from '../../../types/ingredients.blueprint';


export const get_ingredient_measurement = (ing: ty_ingredient_name):
  ty_ingredient_measurement|null => {

  switch (ing) {
    // ============================== BREAD ==============================
    case 'bread_white_bun_bottom':
      return bread_white_bun_bottom_measurement;
    case 'bread_white_bun_top':
      return bread_white_bun_top_measurement;
    case 'bread_bagel_bottom':
      return bread_bagel_bottom_measurement;
    case 'bread_bagel_top':
      return bread_bagel_top_measurement;
    case 'bread_brioche_bun_bottom':
      return bread_brioche_bun_bottom_measurement;
    case 'bread_brioche_bun_top':
      return bread_brioche_bun_top_measurement;
    case 'bread_seeded_bun_bottom':
      return bread_seeded_bun_bottom_measurement;
    case 'bread_seeded_bun_top':
      return bread_seeded_bun_top_measurement;
    case 'bread_wholemeal_bun_bottom':
      return bread_wholemeal_bun_bottom_measurement;
    case 'bread_wholemeal_bun_top':
      return bread_wholemeal_bun_top_measurement;

    // ============================== Meat ==============================
    case 'meat_beef':
      return meat_beef_measurement;
    // ============================== cheese ==============================

    case 'cheese_processed':
      return cheese_processed_measurement;
    case 'cheese_feta':
      return cheese_feta_measurement;
    case 'cheese_mozzarella':
      return cheese_mozzarella_measurement;
    case 'cheese_goat':
      return cheese_goat_measurement;
    case 'cheese_stilton':
      return cheese_stilton_measurement;


    // ============================== vegetables ==============================
    case 'vegetable_onion':
      return vegetable_onion_measurement;
    case 'vegetable_tomato':
      return vegetable_tomato_measurement;
    case 'vegetable_cucumber':
      return vegetable_cucumber_measurement;
    case 'vegetable_mashroom':
      return vegetable_mashroom_measurement;
    case 'vegetable_potato':
      return vegetable_potato_measurement;
    case 'vegetable_capsicum':
      return vegetable_capsicum_measurement;
    case 'vegetable_chili_pepper':
      return vegetable_chili_pepper_measurement;
    // ============================== leaf ==============================
    case 'leaf_lettuce':
      return leaf_lettuce_measurement;
    default:
      return null;
  }
}

export const getIngredientsList =
  (list: ty_ingredient_name[], canvasHeight: number): Ingredient[] => {

    const ingredientClassList: Ingredient[] = [];

    let targetHeight: number;
    let calculatingHeight: number;

    const initalHeight = canvasHeight - 200;

    list.forEach((el, idx) => {

      let itemMeasurement = get_ingredient_measurement(el);

      if(!itemMeasurement) return;

      // if it is first item
      if (idx === 0) {
        // targetHeight = 400;
        // calculatingHeight = 400 + itemMeasurement.fadedHeight;
        targetHeight = initalHeight;
        calculatingHeight = initalHeight + itemMeasurement.fadedHeight;
      }
      // // if it is last item
      // else if(idx === list.length-1) {
      //   targetHeight = targetHeight - itemMeasurement.shortenHeight
      // }
      else {
        targetHeight = calculatingHeight - itemMeasurement.shortenHeight;
        calculatingHeight = targetHeight + itemMeasurement.fadedHeight;
      }

      switch (el) {

        // ============================== BREAD ==============================
        case 'bread_white_bun_bottom':
          ingredientClassList.push(new Bread_White_Bun_Bottom(targetHeight));
          break;
        case 'bread_white_bun_top':
          ingredientClassList.push(new Bread_White_Bun_Top(targetHeight));
          break;
        case 'bread_bagel_bottom':
          ingredientClassList.push(new Bread_Bagel_Bottom(targetHeight));
          break;
        case 'bread_bagel_top':
          ingredientClassList.push(new Bread_Bagel_Top(targetHeight));
          break;
        case 'bread_brioche_bun_bottom':
          ingredientClassList.push(new Bread_Brioche_Bun_Bottom(targetHeight));
          break;
        case 'bread_brioche_bun_top':
          ingredientClassList.push(new Bread_Brioche_Bun_Top(targetHeight));
          break;
        case 'bread_seeded_bun_bottom':
          ingredientClassList.push(new Bread_Seeded_Bun_Bottom(targetHeight));
          break;
        case 'bread_seeded_bun_top':
          ingredientClassList.push(new Bread_Seeded_Bun_Top(targetHeight));
          break;
        case 'bread_wholemeal_bun_bottom':
          ingredientClassList.push(new Bread_Wholemeal_Bun_Bottom(targetHeight));
          break;
        case 'bread_wholemeal_bun_top':
          ingredientClassList.push(new Bread_Wholemeal_Bun_Top(targetHeight));
          break;


        // ============================== Meat ==============================
        case 'meat_beef':
          ingredientClassList.push(new Meat_Beef(targetHeight));
          break;
        // ============================== cheese ==============================

        case 'cheese_processed':
          ingredientClassList.push(new Cheese_Processed(targetHeight));
          break;
        case 'cheese_feta':
          ingredientClassList.push(new Cheese_Feta(targetHeight));
          break;
        case 'cheese_mozzarella':
          ingredientClassList.push(new Cheese_Mozzarella(targetHeight));
          break;
        case 'cheese_goat':
          ingredientClassList.push(new Cheese_Goat(targetHeight));
          break;
        case 'cheese_stilton':
          ingredientClassList.push(new Cheese_Stilton(targetHeight));
          break;


        // ============================== vegetables ==============================

        case 'vegetable_onion':
          ingredientClassList.push(new Vegetable_Onion(targetHeight));
          break;

        case 'vegetable_tomato':
          ingredientClassList.push(new Vegetable_Tomato(targetHeight));
          break;
        case 'vegetable_cucumber':
          ingredientClassList.push(new Vegetable_Cucumber(targetHeight));
          break;
        case 'vegetable_mashroom':
          ingredientClassList.push(new Vegetable_Mashroom(targetHeight));
          break;
        case 'vegetable_potato':
          ingredientClassList.push(new Vegetable_Potato(targetHeight));
          break;
        case 'vegetable_capsicum':
          ingredientClassList.push(new Vegetable_Capsicum(targetHeight));
          break;
        case 'vegetable_chili_pepper':
          ingredientClassList.push(new Vegetable_Chili_Pepper(targetHeight));
          break;
        // ============================== leaf ==============================
        case 'leaf_lettuce':
          ingredientClassList.push(new Leaf_Lettuce(targetHeight));
          break;

      }



    })

    return ingredientClassList;

  }