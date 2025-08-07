import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserSignInDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

}
