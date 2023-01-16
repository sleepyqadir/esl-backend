import { Request, Response } from 'express';
import {
  Controller,
  Put,
  Req,
  UseGuards,
  Patch,
  Query,
  Post,
  Get,
  Header,
  Res,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('register')
  createUser(@Body() reqBody: any) {
    return this.userService.createUser(reqBody);
  }

  @Post("login")
  loginUser(@Body() reqBody: any) {
    return this.userService.loginUser(reqBody);
  }

  @Get('/drop')
  drop() {
    this.userService.dropProjectIndexes();
  }

  //   @UseGuards(new JWTAuthGuard())
  //   @Put('/updateProfile')
  //   async updateProfile(@Req() req: Request, @Query() query) {
  //     const response = await this.profileService.updateProfile(req, query);
  //     return response;
  //   }

  // //   @UseGuards(new JWTAuthGuard())
  //   @Patch('/updatePassword')
  //   async updatePassword(@Req() req: Request, @Query() query) {
  //     const response = await this.profileService.updatePassword(req, query);
  //     return response;
  //   }
}
