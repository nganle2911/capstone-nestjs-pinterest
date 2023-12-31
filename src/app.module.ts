import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ImagesModule } from './images/images.module';
import { CommentsModule } from './comments/comments.module';
import { SaveImgModule } from './save_img/save_img.module';
import { UsersModule } from './users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({isGlobal: true}), ImagesModule, CommentsModule, SaveImgModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
