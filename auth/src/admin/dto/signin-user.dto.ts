import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AdminSignInDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

}
