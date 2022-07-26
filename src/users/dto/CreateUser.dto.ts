import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  username: string;

  @MinLength(3)
  @IsString()
  password: string;
}
