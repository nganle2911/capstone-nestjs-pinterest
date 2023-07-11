import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaveImgService } from './save_img.service';
import { CreateSaveImgDto } from './dto/create-save_img.dto';
import { UpdateSaveImgDto } from './dto/update-save_img.dto';

@Controller('save-img')
export class SaveImgController {
  constructor(private readonly saveImgService: SaveImgService) {}

  // Check whether the image is saved or not
  @Get("check-image/:image_id")
  checkImage(@Param("image_id") image_id:number){
    return this.saveImgService.checkImage(Number(image_id));
  }
}
