import { IsEmail, IsString, IsDefined } from 'class-validator';

export class UserRegisterDto {
  @IsDefined()
  @IsEmail()
    email: string;

  @IsDefined()
  @IsString()
    password: string;

  @IsDefined()
  @IsString()
    name: string;
}
