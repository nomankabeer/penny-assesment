import { IsString, IsEmail, MinLength, Validate, IsNumber, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;
  
  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;
}
