import { IsString, IsEmail } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsString()
  @IsEmail()
  email: string;
}
