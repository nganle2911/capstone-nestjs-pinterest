import { Image } from './entities/image.entity';
import { HttpException, Injectable, Param,Body, Headers } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ImagesService {
  prisma = new PrismaClient();

  constructor(private jwtService:JwtService) {}

  async getImageList(){
    return await this.prisma.images.findMany()
  }

  async getImageByName(imgName: string) {
    try {
      // Find image by name 
    let imageByName = await this.prisma.images.findFirst({
      where: {
        image_name: imgName
      }
    }); 

    if (imageByName) {
      return imageByName; 
    } else {
      throw new HttpException("image_name not found!", 404); 
    }
    } catch (err) {
      console.log(err);
      throw new HttpException(err.response, err.status!=500?err.status:500); 
    }
    
  }

  async getInfoByImageId(imgId:number){
    try{
      let info = await this.prisma.images.findFirst({
        include:{
          users:true
        },
        where:{
          image_id:imgId
        }
      })
      if(info){
        return info;
      }
      else {
        throw new HttpException("image_id not found!", 400); 
      }
      
    }
    catch(err){
      console.log(err);
      throw new HttpException(err.response, err.status!=500?err.status:500); 
    }
    
  }

  async getCreatedImageList(token){
    try{
      let decodedToken = await this.jwtService.decode(token);
      let userId = decodedToken['user_id']
      
      let checkUser = await this.prisma.images.findMany({
        where:{
          user_id:userId
        }
      })
  
      if(checkUser){
        if(checkUser.length===0){
          return "This user hasn't created any image yet!"
        }else{
          return checkUser;
        }
      }
    }
    catch(err){
      throw new HttpException(err.response, err.status!=500?err.status:500); 
    }
  }

  async removeCreatedImage(image_id: number, token) {
    try {
      let decodedToken = await this.jwtService.decode(token);
      let userId = decodedToken['user_id']; 

      let imageId = await this.prisma.images.deleteMany({
        where: {
          image_id,
          user_id: userId
        }
      }); 

      if (imageId.count !== 0) {
        console.log(imageId)
        return "Image deleted successfully!";
      } else {
        throw new HttpException("image not found", 404); 
      }
    } catch (err) {
      throw new HttpException(err.response, err.status != 500 ? err.status : 500); 
    }
  }

  async uploadImage(file:Express.Multer.File, description,token){
    try{

      let decodedToken = await this.jwtService.decode(token);
      let userId = decodedToken['user_id']; 

      await this.prisma.images.create({
        data: {
          image_name:file.filename,
          image_path:file.path,
          description,
          user_id:userId
        }
      })
      
  }
    catch(err){
      throw new HttpException(err.response, err.status!=500?err.status:500); 
    }
  }

  

}
