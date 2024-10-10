import { ExceptionFilter, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';  // If you want to use a library like Luxon for advanced datetime features
@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
      ) {}

  async register(username: string, email: string, password: string): Promise<boolean | User> {
    // Check if the email already exists
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      return false;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, email, password: hashedPassword });
    await newUser.save();

    return newUser;
  }


  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserByEmailAndResetPasswordCode(email: string, reset_password_code: number): Promise<User | null> {
    return this.userModel.findOne({ email, reset_password_code }).exec();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async resetPassword(reset_password_code: number, email: string, password: string, confirm_password: string): Promise<object> {
    if(password != confirm_password){
      return {status: false, message: 'password does not match'}
    }
    console.log(email, reset_password_code, password, confirm_password, 'ddddddddddd')
    const user = await this.findUserByEmailAndResetPasswordCode(email, reset_password_code);
    if (user) {
    
      const hashedPassword = await bcrypt.hash(password, 10);
      user.reset_password_code = null;
      user.reset_password_request_at = null;
      user.password = hashedPassword;
      await user.save();
      return {status: true, 'message': 'success', email: user.email};
    }
    return {status: false, 'message': 'Incorrect Code'};
  }

  async resetPasswordRequest(email: string): Promise<object> {
    const user = await this.findUserByEmail(email);
    if (user) {
      const resetPasswordCode = Math.floor(1000 + Math.random() * 9000).toString();
      user.reset_password_code = resetPasswordCode;
      user.reset_password_request_at = DateTime.now().toJSDate(); // Set the current date and time
      await user.save();
      console.log(resetPasswordCode, 'resetPasswordCode')
      return {status: true, 'message': 'success', email: user.email};
    }
    return {status: false, 'message': 'User Not Found'};
  }

  async login(email: string, password: string): Promise<object> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user._id };
    let token = this.jwtService.sign(payload, { expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME })
      
    return {
      message: 'Login successful',
      access_token: token,
      user,
    };
  }
}

