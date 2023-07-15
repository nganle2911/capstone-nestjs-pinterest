import { Module } from '@nestjs/common';
import { SaveImgService } from './save_img.service';
import { SaveImgController } from './save_img.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SaveImgController],
  providers: [SaveImgService]
})
export class SaveImgModule {}
