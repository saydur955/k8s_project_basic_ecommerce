import { Type } from "class-transformer";
import { IsIn, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";


export class ProductGetAllDTO {

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(9999)
  page?: number;

  @IsOptional()
  @IsIn(['default', 'price_asc', 'price_desc'])
  sort?: 'default' | 'price_asc' | 'price_desc';

  // @IsNotEmpty()
  // @IsMongoId()
  // categoryId: string;

  @IsNotEmpty()
  @IsString()
  categorySlug: string;

  @IsOptional()
  @IsString()
  @Min(1)
  @Max(100)
  item_type: string;

}