import { Module } from '@nestjs/common';
import { SaveImgService } from './save_img.service';
import { SaveImgController } from './save_img.controller';

@Module({
  controllers: [SaveImgController],
  providers: [SaveImgService]
})
export class SaveImgModule {}
