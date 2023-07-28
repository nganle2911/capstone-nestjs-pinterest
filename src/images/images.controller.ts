import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard("jwt"))
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService,
  ) { }

  // Get images list 
  @Get('get-image-list')
  getImageList() {
    return this.imagesService.getImageList();
  }

  // Get image by image_name  
  @Get("get-image-by-name/:image_name")
  getImageByName(@Param("image_name") image_name: string) {
    return this.imagesService.getImageByName(image_name);
  }

  // Get image's info and its creator by image_id 
  @Get("get-info-by-img-id/:image_id")
  getInfoByImageId(@Param("image_id") image_id: number) {
    return this.imagesService.getInfoByImageId(Number(image_id));
  }

  // Get created images list by user_id
  @Get("get-created-image-list")
  getCreatedImageList(@Headers("token") token) {
    return this.imagesService.getCreatedImageList(token)
  }

  // Delete created image by image_id 
  @Delete("remove-image/:image_id")
  removeCreatedImage(@Param("image_id") image_id: number, @Headers("token") token) {
    return this.imagesService.removeCreatedImage(+image_id, token);
  }

  // Upload new image 
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => {
        callback(null, new Date().getTime() + file.originalname)
      }
    })
  }))
  @Post("upload-image")
  uploadImage(@UploadedFile() file: Express.Multer.File, @Body("description") description, @Headers("token") token) {
    return this.imagesService.uploadImage(file, description, token)
  }
}
