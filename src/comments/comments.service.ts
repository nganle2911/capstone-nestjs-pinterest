import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentsService {
  prisma = new PrismaClient(); 
  
  async getCommentsByImgId(image_id: number) {
    try {
      let comment = await this.prisma.comments.findMany({
        where: {
          image_id
        }
      });

      if (comment.length > 0) {
        console.log("comment");
        return comment;
      } else {
        throw new HttpException("image_id not found!", 400);
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(err.response, err.status!=500?err.status:500);
    }
  }

  async saveComment(userComment) {
    let {comment_id, user_id, image_id, comment_date, content} = userComment; 

    let newComment = {
      user_id,
      image_id,
      comment_date: new Date(),
      content
    }

    await this.prisma.comments.create({data: newComment}); 
    return "Save successfully!"; 
  }
}
