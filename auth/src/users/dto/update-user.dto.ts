import { IsNotEmpty, IsOptional, IsString } from "class-validator";


// export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserDto {

  @IsOptional()
  @IsString()
  name?: string;

}
