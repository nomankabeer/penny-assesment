import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service'; 

@Controller('user')
export class UserController {
	constructor( private UserService: UserService ) {}

  @UseGuards(JwtAuthGuard) 
  @Get('user-listing')
  async user_listing() {
    return await this.UserService.UserListing();
  }

}
