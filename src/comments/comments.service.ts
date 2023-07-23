import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommentsService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  // Get comments by image_id
  async getCommentsByImgId(image_id: number) {
    try {

      let checkImage = await this.prisma.images.findFirst({
        where:{
          image_id
        }
      })

      if(checkImage){
        let comment = await this.prisma.comments.findMany({
          where: {
            image_id,
          },
        });
        if (comment.length > 0) {
          return comment;
        } else {
          throw new HttpException('This image has no comment', 404);
        }
      }
      else{
        throw new HttpException('Image not found', 404);
      }

    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  // Save user's comments on image
  async saveComment(userComment, token) {
    try {
      let decodedToken = await this.jwtService.decode(token);
      let userId = decodedToken['user_id'];

      let { image_id, content } = userComment;

      let newComment = {
        user_id:userId,
        image_id,
        comment_date: new Date(),
        content,
      };

      await this.prisma.comments.create({
        data:newComment
      });
      return 'Save successfully!';
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
