import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
      ) {}


  async UserListing() {
    const users = await this.userModel.find().exec();
    const userList = users.map((user) => {
      return {
        userId: user._id,
        username: user.username,
        email: user.email,
      };
    });
    return userList;
  }
}

