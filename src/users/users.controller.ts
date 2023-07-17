import { Body, Controller, Get,Headers, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { PrismaClient } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@UseGuards(AuthGuard("jwt"))
@Controller('users')
export class UsersController {
  prisma = new PrismaClient();
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(AuthGuard("jwt"))
  @Get("get-user")
  getUser(@Headers("token") token){
    return this.usersService.getUser(token)
  }

  // Update user's profile 
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img", 
      filename: (req, file, callback) => {
        callback(null, new Date().getTime() + file.originalname)
      }
    })
  }))
  @Put("update-user")
  updateUser(
    @Headers("token") token, 
    @Body("email") email, 
    @Body("pass_word") pass_word,
    @Body("full_name") full_name, 
    @Body("age") age,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.usersService.updateUser(token, email, pass_word, full_name, +age, file); 
  }
}
