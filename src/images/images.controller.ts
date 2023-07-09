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

}
