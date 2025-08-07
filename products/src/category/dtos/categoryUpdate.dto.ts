import { IsObjectId } from "@bivajon/common";
import { Type } from "class-transformer";
import { IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CategoryUpdateDTO {


  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  slug: string;
  
  @IsOptional()
  @IsObjectId()
  parentCategory?: Types.ObjectId;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  order?: string;

}