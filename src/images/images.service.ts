import { HttpException, Injectable, Param } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class ImagesService {
  prisma = new PrismaClient();

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

  

}
