import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class ImagesService {
  prisma = new PrismaClient();

  async getImageList(){
    return await this.prisma.images.findMany()
  }
  
}
