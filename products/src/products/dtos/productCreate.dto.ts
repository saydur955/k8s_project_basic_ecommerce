import { IsBoolean, IsNumber, IsOptional, IsString, Min, Max, MinLength, MaxLength, IsNotEmpty, IsMongoId, IsArray, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { IsObjectId } from '@bivajon/common';


export class ProductCreateDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  // @IsNotEmpty()
  // @IsMongoId()
  // @Transform(({ value }) => new Types.ObjectId(value as string))
  // categoryId: Types.ObjectId;
  // // @Transform(({ value }) => Types.ObjectId.createFromHexString(value))
  // // categoryId: string;


  // @IsObjectId()
  // categoryId: Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  categories: string[];

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  priceToShow: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  size: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(1000)
  image: string;

  // @IsOptional()
  // @IsNumber()
  // @Max(100)
  // @Min(0)
  // discount?: number;

  @IsNumber()
  @IsOptional()
  @Max(5)
  @Min(0)
  rating_avg?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  rating_quantity?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  review_quantity?: number;


  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5000)
  description: string;

  @IsBoolean()
  @IsOptional()
  on_summary?: boolean;
}