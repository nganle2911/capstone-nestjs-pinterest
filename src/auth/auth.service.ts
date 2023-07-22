import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  prisma = new PrismaClient();

  // Sign up 
  async signUp(userSignUp) {
    try {
      let { email, pass_word, full_name, age } = userSignUp; 

      // Check email if exists
      let checkEmail = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });

      if (checkEmail) {
        throw new HttpException('Email is already existed', 400);
      } else {
        let newUser = {
          email,
          pass_word: bcrypt.hashSync(pass_word, 10),
          full_name,
          age,
        };

        await this.prisma.users.create({
          data: newUser,
        });

        return 'Create user successfully';
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  // Login
  async login(userLogin) {
    try {
      let { email, pass_word } = userLogin;

      // Check user if exists
      let checkUser = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });

      // if email existed => check pass_word
      if (checkUser) {
        if (bcrypt.compareSync(pass_word, checkUser.pass_word)) {
          checkUser = { ...checkUser, pass_word: '' };

          // successfully login => return token
          let token = this.jwtService.signAsync(
            { user_id: Number(checkUser.user_id) },
            { secret: this.configService.get('KEY'), expiresIn: '60m' },
          ); 
          return token;
        } else {
          // pass_word is incorrect
          throw new HttpException('Password is incorrect!', 400);
        }
      } else {
        throw new HttpException(
          'Email or password is incorrect!' ,
          400,
        );
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
