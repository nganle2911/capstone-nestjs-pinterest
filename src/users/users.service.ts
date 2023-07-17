import {  Injectable,HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  constructor(private jwtService:JwtService) {}

  async getUser(token){
    
    try{
      let decodedToken = await this.jwtService.decode(token)
      let id = decodedToken['user_id']
      let checkUser = await this.prisma.users.findFirst({
        where:{
          user_id: id
        }
       })
       if(checkUser){
        return {...checkUser,token};
       }
       else{
        throw new HttpException({mess:"user_id not found!"}, 400); 
       }
    }
    catch(err){
      throw new HttpException(err.response.mess, err.status);
    }     
  }

  async updateUser(token, email, pass_word, full_name, age, file: Express.Multer.File) {
    try {
      let decodedToken = await this.jwtService.decode(token)
      let userId = decodedToken['user_id'];

    
      let newData = {
          email,
          pass_word,
          full_name,
          age,
          avatar : file.filename
      }

      await this.prisma.users.update({
        where: {
          user_id: userId
        },
        data: {
          email, 
          pass_word, 
          full_name,
          age,
          avatar : file.filename
        }
      });
      
    } catch (err) {
      throw new HttpException(err.response.mess, err.status);
    }
  }
}
