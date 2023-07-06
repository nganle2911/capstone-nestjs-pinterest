import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  login(userLogin){

  }

  async signUp(userSignUp){
    try{
      let {email, password,full_name, age} = userSignUp;

      // check email if exists
      // let checkEmail = await 

    }
    catch{
    
    }
  }
  
}
