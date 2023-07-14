import { Controller, Get,Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { PrismaClient } from '@prisma/client';
@Controller('users')
export class UsersController {
  prisma = new PrismaClient();
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(AuthGuard("jwt"))
  @Get("get-user")
  getUser(@Headers("token") token){
    return this.usersService.getUser(token)
  }
}
