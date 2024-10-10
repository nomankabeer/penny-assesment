import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'; 
import { UserGuard } from './user.guard';

@Controller('user')
export class UserController {
	constructor( private UserService: UserService ) {}

  @UseGuards(UserGuard) 
  @Get('listing')
  async user_listing() {
    return await this.UserService.UserListing();
  }

}
