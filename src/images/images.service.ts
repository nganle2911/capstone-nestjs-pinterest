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
    } catch (error) {
      console.log(error);
      throw new HttpException(error.response, error.status); 
    }
    
  }
  
}
