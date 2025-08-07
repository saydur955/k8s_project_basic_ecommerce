import { ty_bread_slide, ty_ingredient_item, ty_ingredient_name } from "../../types/ingredients.blueprint";

interface T_bread_item {
  [key: string]: {
    parent: ty_ingredient_name;
    type: ty_bread_slide;
  }
}

export const ingredient_bread_list: ty_ingredient_item[] = [

  {
    name: 'bread_full_white_bun',
    display_name: 'White Bun',
    price: 40,
    img: '/bread/white_bun_full.png',
    img_height: 48,
    items: {
      'top': {
        name: 'bread_white_bun_top',
        display_name: 'Top',
        img: '/bread/white_bun_top.png',
        img_height: 40,
        price: 20
      },
      'bottom': {
        name: 'bread_white_bun_bottom',
        display_name: 'Bottom',
        img: '/bread/white_bun_bottom.png',
        img_height: 34,
        price: 20
      }
    }
  },

  {
    name: 'bread_full_seeded_bun',
    display_name: 'Seeded Bun',
    price: 60,
    img: '/bread/seeded_bun_full.png',
    img_height: 40,
    items: {
      'top': {
        name: 'bread_seeded_bun_top',
        display_name: 'Top',
        img: '/bread/seeded_bun_top.png',
        img_height: 41,
        price: 30
      },
      'bottom': {
        name: 'bread_seeded_bun_bottom',
        display_name: 'Bottom',
        img: '/bread/seeded_bun_bottom.png',
        img_height: 34,
        price: 30
      }
    }
  },

  {
    name: 'bread_full_brioche',
    display_name: 'Brioche Bun',
    price: 50,
    img: '/bread/brioche_bun_full.png',
    img_height: 40,
    items: {
      'top': {
        name: 'bread_brioche_bun_top',
        display_name: 'Top',
        img: '/bread/brioche_bun_top.png',
        img_height: 40,
        price: 25
      },
      'bottom': {
        name: 'bread_brioche_bun_bottom',
        display_name: 'Bottom',
        img: '/bread/brioche_bun_bottom.png',
        img_height: 34,
        price: 25
      }
    }
  },


  {
    name: 'bread_full_wholemeal_bun',
    display_name: 'Wholemeal Bun',
    price: 50,
    img: '/bread/wholemeal_bun_full.png',
    img_height: 40,
    items: {
      'top': {
        name: 'bread_wholemeal_bun_top',
        display_name: 'Top',
        img: '/bread/wholemeal_bun_top.png',
        img_height: 41,
        price: 25
      },
      'bottom': {
        name: 'bread_wholemeal_bun_bottom',
        display_name: 'Bottom',
        img: '/bread/wholemeal_bun_bottom.png',
        img_height: 34,
        price: 25
      }
    }
  },


  {
    name: 'bread_full_bagel',
    display_name: 'Bagel Bun',
    price: 40,
    img: '/bread/bagel_full.png',
    img_height: 36,
    items: {
      'top': {
        name: 'bread_bagel_top',
        display_name: 'Top',
        img: '/bread/bagel_top.png',
        img_height: 29,
        price: 20
      },
      'bottom': {
        name: 'bread_bagel_bottom',
        display_name: 'Bottom',
        img: '/bread/bagel_bottom.png',
        img_height: 31,
        price: 20
      }
    }
  },


];





export const ingredient_bread_item: T_bread_item = {

  'bread_white_bun_top': {
    parent: 'bread_full_white_bun',
    type: 'top'
  },
  'bread_white_bun_bottom': {
    parent: 'bread_full_white_bun',
    type: 'bottom'
  },



  'bread_seeded_bun_top': {
    parent: 'bread_full_seeded_bun',
    type: 'top'
  },
  'bread_seeded_bun_bottom': {
    parent: 'bread_full_seeded_bun',
    type: 'bottom'
  },



  'bread_brioche_bun_top': {
    parent: 'bread_full_brioche',
    type: 'top'
  },
  'bread_brioche_bun_bottom': {
    parent: 'bread_full_brioche',
    type: 'bottom'
  },



  'bread_wholemeal_bun_top': {
    parent: 'bread_full_wholemeal_bun',
    type: 'top'
  },
  'bread_wholemeal_bun_bottom': {
    parent: 'bread_full_wholemeal_bun',
    type: 'bottom'
  },


  'bread_bagel_top': {
    parent: 'bread_full_bagel',
    type: 'top'
  },
  'bread_bagel_bottom': {
    parent: 'bread_full_bagel',
    type: 'bottom'
  }

}