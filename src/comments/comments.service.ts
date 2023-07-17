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
        throw new HttpException({mess:"image_id not found!"}, 400);
      }
    } catch (err) {
      throw new HttpException(err.response.mess, err.status);
    }
  }

  async saveComment(userComment) {
    try{
      let { user_id, image_id, content} = userComment; 

      let newComment = {
        user_id,
        image_id,
        comment_date: new Date(),
        content
      }
  
      await this.prisma.comments.create({data: newComment}); 
      return "Save successfully!"; 
    }
    catch(err){
      throw new HttpException(err.response.mess, err.status);
    }
   
  }
}
