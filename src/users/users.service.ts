import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  async getUser(user_id:number){
   let checkUser = await this.prisma.users.findUnique({
    where:{
      user_id
    }
   })
   return checkUser;
  }

  

}
