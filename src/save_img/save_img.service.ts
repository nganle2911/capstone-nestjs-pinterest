import { HttpException, Injectable } from '@nestjs/common';
import { CreateSaveImgDto } from './dto/create-save_img.dto';
import { UpdateSaveImgDto } from './dto/update-save_img.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SaveImgService {
  prisma = new PrismaClient();

  async checkImage(image_id:number){
  
      let checkImg = await this.prisma.save_img.findFirst({
        where:{
          image_id
        }
      })
      if(checkImg){
        return "Saved"
      }
      else{
        return "Save"
      }
  }
}
