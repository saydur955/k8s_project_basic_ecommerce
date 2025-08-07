// ===================== Shared Events =====================
export interface EventGeneralMongoIdVersion {
  _id: string;
  version: number;
}

export interface EventGeneralMongoId {
  _id: string;
}

// ===================== Product Events =====================
export interface EventProductCreated {
  _id: string;
  name: string;
  price: number;
  image: string;
  version: number;
}

// ===================== Order Events =====================
export interface EventOrderCreated {
  id: string;
  productId: string;
  quantity: number;
}

// ===================== User Events =====================

export interface EventUserCreated {
  id: number;
  name: string;
  __v: number;
}
