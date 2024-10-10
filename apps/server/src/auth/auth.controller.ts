import { Controller, Get, Post, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor( private authService: AuthService ) {}

  @Post('login')
  async login(@Body() req: LoginDto) {
    const { email, password } = req;
    try {
      return await this.authService.login(email, password);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('register')
  async register(@Body() req: RegisterDto) {
		const { username, email, password } = req;
    const user = await this.authService.register(username, email, password);
	
		if(!user){
			return { status: false, message: 'User Already Exist', user: null };
		}
		return { status: true, message: 'User registered successfully', user: user };
  }


  @Post('reset-password-request')
  async resetPasswordRequest(@Body() req: ResetPasswordDto) {
		const { email } = req;
    const user = await this.authService.resetPasswordRequest(email);
    return user;
  }


  @Post('reset-password')
  async resetPassword(@Body() req: ResetPasswordDto) {
    console.log(req,'lglglglglgl ')
		const { code, email, password, confirm_password } = req;
    const user = await this.authService.resetPassword(code, email, password, confirm_password);
    return user;
  }
}
