import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({})],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
