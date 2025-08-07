import { IsObjectId } from "@bivajon/common";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CategoryCreateDTO {

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  slug: string;

  @IsOptional()
  @IsObjectId()
  parentCategory?: Types.ObjectId;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  order: string;

}