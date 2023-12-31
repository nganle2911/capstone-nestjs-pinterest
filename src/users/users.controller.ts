import { Body, Controller, Get,Headers, Patch, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { PrismaClient } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { updateUserDto } from './dto/userDto.dto';
@UseGuards(AuthGuard("jwt"))
@Controller('users')
export class UsersController {
  prisma = new PrismaClient();
  constructor(private readonly usersService: UsersService) {}

  // Get user's info
  @Get("get-user")
  getUser(@Headers("token") token){
    return this.usersService.getUser(token)
  }

  // Update user's profile 
  @Put("update-user")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img", 
      filename: (req, file, callback) => {
        callback(null, new Date().getTime() + file.originalname)
      }
    })
  }))
  updateUser(
    @Headers("token") token, 
    // @Body("email") email, 
    // @Body("pass_word") pass_word,
    // @Body("full_name") full_name, 
    // @Body("age") age,
    @Body() updateUser: updateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.usersService.updateUser(token, updateUser, file); 
  }
}
