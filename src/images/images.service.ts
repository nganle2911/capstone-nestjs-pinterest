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
import { check } from 'prettier';
@Injectable()
export class ImagesService {
  prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  // Get images list
  async getImageList() {  
    try{
      let image = await this.prisma.images.findMany();
      if(image.length>0){
        return image
      }
      else{
        throw new HttpException("The image list is empty", 404)
      }
    }
    catch(err){
      throw new HttpException(err.response, err.status)
    }
    
    
  }

  // Get image by image_name
  async getImageByName(imgName: string) {
    try {
      // Find image by name
      let imageByName = await this.prisma.images.findMany({
        where: {
          image_name: {
            contains: imgName
          },
        },
        
      });
      // Check image if exists 
      if (imageByName.length>0) {
        return imageByName;
      } else {
        throw new HttpException('image_name not found!', 404);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  // Get image's info and its creator by image_id
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

  // Get created images list by user_id
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

  // Delete created image by image_id
  async removeCreatedImage(image_id: number, token) {
    try {
      let decodedToken = await this.jwtService.decode(token);
    let userId = decodedToken['user_id'];

    let checkComment = await this.prisma.comments.deleteMany({
      where: {
        image_id
      }
    });

    let checkSavedImage = await this.prisma.save_img.deleteMany({
      where: {
        image_id,
        user_id: userId
      }
    });

    let imageId = await this.prisma.images.deleteMany({
      where: {
        image_id,
        user_id: userId
      }
    });

    if (imageId.count !== 0) {
      return "Delete image successfully!"; 
    } else {
      throw new HttpException("image not found", 404); 
    }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    } 
  }

  // Upload new image
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
