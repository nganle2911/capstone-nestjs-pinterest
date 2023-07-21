import { SaveImg } from './../save_img/entities/save_img.entity';
import {  Injectable,HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { updateUserDto } from './dto/userDto.dto';
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
        const {pass_word, ...restInfo} = checkUser
        const userInfo = restInfo
        return {...userInfo,token};
       }
       else{
        throw new HttpException("user_id not found!", 400); 
       }
    }
    catch(err){
      throw new HttpException(err.response, err.status);
    }     
  }

  async updateUser(token, updateUser, file: Express.Multer.File) {
    // Patch method 
    /* try {
      let decodedToken = await this.jwtService.decode(token)
      let userId = decodedToken['user_id'];
      console.log("userId", userId)

      let {email, pass_word, full_name, age} = updateUser;
      console.log("updateUser", updateUser); 

      let newData = {
        email,
        pass_word: bcrypt.hashSync(pass_word, 10),
        full_name,
        age: +age,
        avatar : file.filename
      }

      console.log("newData", newData);
      await this.prisma.users.update({
        where: {
          user_id: userId
        },
        data: {
          ...newData
        }
      });
      return "Update user successfully";

    } catch (err) {
      throw new HttpException(err.response, err.status);
    } */

    // Put method 
    try {
      let decodedToken = await this.jwtService.decode(token)
      let userId = decodedToken['user_id'];

      let {email, pass_word, full_name, age} = updateUser; 
      console.log("update user", updateUser); 
    
      let newData = {
          email,
          pass_word: bcrypt.hashSync(pass_word, 10),
          full_name,
          age: +age,
          avatar : file.filename
      }

      console.log("new data", newData);

      await this.prisma.users.update({
        where: {
          user_id: userId
        },
        data: {
          ...newData
        }
      });
      return "Update user successfully";
      
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
