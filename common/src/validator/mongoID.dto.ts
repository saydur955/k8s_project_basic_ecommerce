// @ts-nocheck
import { IsNotEmpty } from "class-validator";
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { BadRequestException } from "@nestjs/common";


export class MongoIdDTO {

  @IsNotEmpty()
  @Transform(({ value, key }) => {

    if (!value || typeof value !== 'string' || !Types.ObjectId.isValid(value) ) {
      throw new BadRequestException(`${key} must be mongodb id`);
    }
    return new Types.ObjectId(value);
  })
  id: Types.ObjectId;

}