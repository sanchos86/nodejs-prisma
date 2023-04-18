import { IsEmail, IsDefined, IsString } from 'class-validator';

export class UserLoginDto {
  @IsDefined()
  @IsEmail()
    email: string;

  @IsDefined()
  @IsString()
    password: string;
}
