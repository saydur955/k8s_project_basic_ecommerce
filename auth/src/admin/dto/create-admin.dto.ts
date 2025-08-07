import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CreateAdminDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsNotEmpty()
  @IsString()
  name: string;


  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;


  @IsOptional()
  @IsString()
  profile_image: string;


}
