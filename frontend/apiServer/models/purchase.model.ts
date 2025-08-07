import { Schema, model, models, Model } from 'mongoose';

export interface ty_purchase {
  burger_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;

  user_name: string;

  purchase_history: {
    amount: number;
    date: Date
  }[]

  rating: number|null;
  review: string|null;
  reviewed_at: Date|null;
}

const purchaseSchema = new Schema<ty_purchase>({

  burger_id: {
    type: Schema.Types.ObjectId,
    default: null
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  purchase_history: {
    type: [
      {
        amount: Number,
        date: Date
      }
    ]
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  review: {
    type: String,
    minlength: 2,
    maxlength: 500,
    default: null
  },
  reviewed_at: {
    type: Date,
    default: null
  }

});

export const Purchases: Model<ty_purchase> = models.Purchase || 
model<ty_purchase>('Purchase', purchaseSchema);


purchaseSchema.index({ burger_id: 1, user_id: 1 }, { unique: true });
