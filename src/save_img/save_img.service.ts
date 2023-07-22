import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateSaveImgDto } from './dto/create-save_img.dto';
import { UpdateSaveImgDto } from './dto/update-save_img.dto';
import { PrismaClient } from '@prisma/client';
import { check } from 'prettier';

@Injectable()
export class SaveImgService {
  prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  // Check whether the image is saved or not 
  async checkImage(image_id:number){
      try{
        let checkImg = await this.prisma.images.findFirst({
          where:{
            image_id
          }
        })
        
        // Check image if exists in table images. 
        // If yes => check image if exists in table save_img 
        if(checkImg){
          let checkSave = await this.prisma.save_img.findFirst({
            where: {
              image_id
            }
          })
          
          if (checkSave) {
            return "Saved!"; 
          } else {
            return "Save"; 
          }
        } else {
          return "This image does not exist!"; 
        }
      }
      catch(err){
        throw new HttpException(err.response, err.status); 
      }
  }

  async getSavedImageList(token) {
    try{
      let decodedToken = await this.jwtService.decode(token);
      let userId = decodedToken["user_id"]; 

      let checkUser = await this.prisma.save_img.findMany({
        where: {
          user_id: userId
        },
        include: {
          images: true
        }
      }); 
  
      if (checkUser) {
        if (checkUser.length === 0) {
          return "This user hasn't saved any images yet!"; 
        } else {
          return checkUser;
        }

      } else {
        throw new HttpException("user not found", 404); 
      }
    }
    catch(err){
      throw new HttpException(err.response, err.status); 
    }
    }
    
}
