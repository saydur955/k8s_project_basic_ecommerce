import { IsNotEmpty, IsNumber, ValidateNested, IsArray, ArrayMinSize, ArrayMaxSize, IsString } from "class-validator";
import { Type } from "class-transformer";
import { IsObjectId } from "@bivajon/common";
import { Types } from "mongoose";


class OrderItemDto {
 
  @IsObjectId()
  productId: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  items: OrderItemDto[];


  @IsNotEmpty()
  @IsString()
  reciverPhone: string;

  @IsNotEmpty()
  @IsString()
  shippingAddress: string;

}