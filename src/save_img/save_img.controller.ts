import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards } from '@nestjs/common';
import { SaveImgService } from './save_img.service';
import { CreateSaveImgDto } from './dto/create-save_img.dto';
import { UpdateSaveImgDto } from './dto/update-save_img.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard("jwt"))
@Controller('save-img')
export class SaveImgController {
  constructor(private readonly saveImgService: SaveImgService) {}

  // Check whether the image is saved or not
  @Get("check-image/:image_id")
  checkImage(@Param("image_id") image_id:number, @Headers("token") token){
    return this.saveImgService.checkImage(Number(image_id),token);
  }

  // Get saved images list by user_id 
  @Get("get-saved-image-list")
  getSavedImageList(@Headers("token") token) {
    return this.saveImgService.getSavedImageList(token); 
  }
}
