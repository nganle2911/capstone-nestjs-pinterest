import { Controller, Get, Post, Body, Patch, Param, Delete,Headers } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService,
    ) {}

  // Get image list 
  @Get('get-image-list')
  getImageList(){
    return this.imagesService.getImageList();
  }
  
  // Get images by image_name 
  @Get("get-image-by-name/:image_name")
  getImageByName(@Param("image_name") image_name: string) {
    return this.imagesService.getImageByName(image_name);
  }

  // Get image and user by image id
  @Get("get-info-by-img-id/:image_id")
  getInfoByImageId(@Param("image_id") image_id:number){
    return this.imagesService.getInfoByImageId(Number(image_id));
  }

  // Get created image list
  @Get("get-created-image-list")
  getCreatedImageList(@Headers("token") token){
    return this.imagesService.getCreatedImageList(token)
  }

  // Delete created image by image_id 
  @Delete("remove-image/:image_id")
  removeCreatedImage(@Param("image_id") image_id: number) {
    return this.imagesService.removeCreatedImage(+image_id); 
  }

}
