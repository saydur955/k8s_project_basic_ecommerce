import { JsMsg } from 'nats';
import { EventProductCreated, EventOrderCreated, EventUserCreated, EventGeneralMongoId } from './nats.events';

export type nats_msg = JsMsg;

export enum nats_subjects {
  products = 'product.*',
  orders = 'order.*',
  users = 'user.*',
}

export enum nats_subject {
  // Product-related subjects
  productCreated = 'product.created',
  productUpdated = 'product.updated',
  productDeleted = 'product.deleted',

  // Order-related subjects
  orderCreated = 'order.created',
  orderUpdated = 'order.updated',
  orderDeleted = 'order.deleted',
  orderCompleted = 'order.completed',

  // user-related subjects
  userCreated = 'user.created',
  userUpdated = 'user.updated',
  userDeleted = 'user.deleted',
}


export interface NatsEventMap {

  [nats_subject.productCreated]: EventProductCreated;
  [nats_subject.productUpdated]: EventProductCreated;
  [nats_subject.productDeleted]: EventGeneralMongoId;

  [nats_subject.orderCreated]: EventOrderCreated;

  [nats_subject.userCreated]: EventUserCreated;
}