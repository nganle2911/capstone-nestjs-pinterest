import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class AuthService {

  prisma = new PrismaClient();

  login(userLogin){

  }

  async signUp(userSignUp){
    try{
      let {email, pass_word,full_name, age} = userSignUp;

      // check email if exists
      let checkEmail = await this.prisma.users.findFirst({
        where:{
          email,
        },
      })

      // if email is already existed
      if(checkEmail){
        throw new HttpException("Email is already existed",400);
      }
      // if not, create the new user 
      else{

        let newUser = {
          email,
          pass_word: bcrypt.hashSync(pass_word,10), //encode the password
          full_name,
          age
        }

        // create new user
        await this.prisma.users.create({
          data:newUser
        })

        return "Create user successfully"
      }

    }
    
    catch{
      throw new HttpException("Error from BE",500)
    }
  }
  
}
