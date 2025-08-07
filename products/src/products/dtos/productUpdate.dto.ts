import { IsBoolean, IsNumber, IsOptional, IsString, Min, Max, MinLength, MaxLength, IsMongoId, IsArray } from 'class-validator';

export class ProductUpdateDTO {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categories?: string[];


  @IsNumber()
  @IsOptional()
  @Min(0)
  price?: number;


  @IsNumber()
  @IsOptional()
  @Min(0)
  priceToShow?: number;


  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  size?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1000)
  image?: string;

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
  @IsOptional()
  @MinLength(3)
  @MaxLength(500)
  subtitle?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(5000)
  description?: string;

  @IsBoolean()
  @IsOptional()
  on_summary?: boolean;
}