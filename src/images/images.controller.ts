import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

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

}
