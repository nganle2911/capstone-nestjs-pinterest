import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, users } from '@prisma/client';
@Controller('users')
export class UsersController {
  prisma = new PrismaClient();
  constructor(private readonly usersService: UsersService,
    private jwtService:JwtService) {}

  // @UseGuards(AuthGuard("jwt"))
  @Get("get-user1")
  async getUser(@Headers("token") token){
    let decodedToken = await this.jwtService.decode(token)
    // let id = decodedToken.user_id
    console.log(decodedToken.user_id)
    let checkUser = await this.prisma.users.findFirst({
      where:{
        user_id: decodedToken.user_id
      }
     })
     return "checkUser";
  }
}
