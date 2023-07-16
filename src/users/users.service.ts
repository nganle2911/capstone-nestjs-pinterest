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
        return checkUser;
       }
       else{
        throw new HttpException("user_id not found!", 400); 
       }
    }
    catch(err){
      throw new HttpException(err.response, err.status!=500?err.status:500); 
    }     
  }

  async updateUser(token, email, full_name, file: Express.Multer.File) {
    // try {
      let decodedToken = await this.jwtService.decode(token)
      let userId = decodedToken['user_id'];

    
      let newData = {
          email, 
          full_name,
          avatar : file.filename
      }
      console.log(newData); 
      await this.prisma.users.update({
        where: {
          user_id: userId
        },
        data: {
          email,  
          full_name,
          avatar : file.filename
        }
      });
      
    // } catch (err) {
    //   throw new HttpException(err.response, err.status!=500?err.status:500); 
    // }
  }
}
