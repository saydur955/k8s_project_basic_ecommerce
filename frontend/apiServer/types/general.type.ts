import mongoose from "mongoose";


export interface ty_api_get_options {
  params: { [key: string]: string }
}

export type ty_auth_payload = {
  _id: string;
}

export type ty_ObjectId = mongoose.Types.ObjectId;
