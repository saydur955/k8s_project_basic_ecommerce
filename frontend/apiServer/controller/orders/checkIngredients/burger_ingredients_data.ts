// export type ty_bread_item_type = 'top'| 'bottom';

interface Titem {
  [key: string]: {
    price: number;
  }
}

interface T_bread_item {
  [key: string]: {
    parent: string;
    type: 'top'| 'bottom';
  }
}


export const burger_ingredient_item_list: Titem = {

  // ================================= cheese =================================
  'cheese_processed': {
    price: 50
  },

  'cheese_feta': {
    price: 40
  },

  'cheese_stilton': {
    price: 60
  },

  'cheese_mozzarella': {
    price: 45
  },

  'cheese_goat': {
    price: 35
  },

  // ================================= leaf =================================
  'leaf_lettuce': {
    price: 15
  },

  // ================================= meat =================================

  'meat_beef': {
    price: 100
  },


  // ================================= vegetable =================================
  'vegetable_cucumber': {
    price: 15
  },

  'vegetable_tomato': {
    price: 12
  },

  'vegetable_onion': {
    price: 10
  },

  'vegetable_mashroom': {
    price: 35
  },

  'vegetable_capsicum': {
    price: 30
  },

  'vegetable_chili_pepper': {
    price: 10
  },

  'vegetable_potato': {
    price: 10
  }

}


export const burger_ingredient_bread_item_list: T_bread_item = {

  'bread_white_bun_top': {
    parent: 'white_bun_full',
    type: 'top'
  },
  'bread_white_bun_bottom': {
    parent: 'white_bun_full',
    type: 'bottom'
  },



  'bread_seeded_bun_top': {
    parent: 'seeded_bun_full',
    type: 'top'
  },
  'bread_seeded_bun_bottom': {
    parent: 'seeded_bun_full',
    type: 'bottom'
  },



  'bread_brioche_bun_top': {
    parent: 'brioche_bun_full',
    type: 'top'
  },
  'bread_brioche_bun_bottom': {
    parent: 'brioche_bun_full',
    type: 'bottom'
  },



  'bread_wholemeal_bun_top': {
    parent: 'wholemeal_bun_full',
    type: 'top'
  },
  'bread_wholemeal_bun_bottom': {
    parent: 'wholemeal_bun_full',
    type: 'bottom'
  },


  'bread_bagel_top': {
    parent: 'bagel_full',
    type: 'top'
  },
  'bread_bagel_bottom': {
    parent: 'bagel_full',
    type: 'bottom'
  }

}


export const burger_ingredient_bread_full_list: Titem = {
  'white_bun_full': {
    price: 40
  },

  'seeded_bun_full': {
    price: 60
  },

  'brioche_bun_full': {
    price: 50
  },

  'wholemeal_bun_full': {
    price: 50
  },

  'bagel_full': {
    price: 40
  }
}