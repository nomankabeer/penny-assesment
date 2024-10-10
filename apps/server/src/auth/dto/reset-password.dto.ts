import { IsString, IsEmail, MinLength, Validate, IsNumber, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsNumber()
  code: number;

  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;

  @IsString()
  @MinLength(4, { message: 'Confirm Password must be at least 4 characters long' })
  confirm_password: string;
}
