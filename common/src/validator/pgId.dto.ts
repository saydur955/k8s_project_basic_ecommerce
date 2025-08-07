// @ts-nocheck
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class PgIdDTO {

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(9999999)
  @Type(() => Number)
  id: number;

}
