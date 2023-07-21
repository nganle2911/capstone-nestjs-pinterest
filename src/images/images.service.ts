import { Image } from './entities/image.entity';
import {
  HttpException,
  Injectable,
  Param,
  Body,
  Headers,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ImagesService {
  prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  async getImageList() {
    return await this.prisma.images.findMany();
  }

  async getImageByName(imgName: string) {
    try {
      // Find image by name
      let imageByName = await this.prisma.images.findFirst({
        where: {
          image_name: imgName,
        },
      });

      if (imageByName) {
        return imageByName;
      } else {
        throw new HttpException('image_name not found!', 404);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async getInfoByImageId(imgId: number) {
    try {
      let info = await this.prisma.images.findFirst({
        include: {
          users: true,
        },
        where: {
          image_id: imgId,
        },
      });
      if (info) {
        const {users: { pass_word, ...userInfo },...imageInfo} = info;
        const updatedInfo = { ...imageInfo, users: userInfo };
        return updatedInfo;
      } else {
        throw new HttpException('image_id not found!', 400);
      }
    } catch (err) {

      throw new HttpException(err.response, err.status);
    }
  }

  async getCreatedImageList(token) {
    try {
      let decodedToken = await this.jwtService.decode(token);
      let userId = decodedToken['user_id'];

      let checkUser = await this.prisma.images.findMany({
        where: {
          user_id: userId,
        },
      });

      if (checkUser) {
        if (checkUser.length === 0) {
          return "This user hasn't created any image yet!";
        } else {
          return checkUser;
        }
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async removeCreatedImage(image_id: number, token) {
    try {
      let decodedToken = await this.jwtService.decode(token);
      let userId = decodedToken['user_id'];

      let imageId = await this.prisma.images.deleteMany({
        where: {
          image_id,
          user_id: userId,
        },
      });

      console.log(imageId.count);
      if (imageId.count !== 0) {
        return 'Image deleted successfully!';
      } else {
        throw new HttpException('image not found', 404);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async uploadImage(file: Express.Multer.File, description, token) {
    try {
      let decodedToken = await this.jwtService.decode(token);
      let userId = decodedToken['user_id'];

      await this.prisma.images.create({
        data: {
          image_name: file.filename,
          image_path: file.path,
          description,
          user_id:userId
        }
      })

      return "Create image successfully"
      
  }
    catch(err){
      throw new HttpException(err.response, err.status); 
    }
  }
}
