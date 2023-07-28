import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard("jwt"))
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Get comments by image_id
  @Get("get-comments-by-img-id/:image_id")
  getCommentsByImgId(@Param("image_id") image_id: number) {
    return this.commentsService.getCommentsByImgId(+image_id)
  }
  
  // Save user's comments on image 
  @Post("save-comment")
  saveComment(@Body() body, @Headers("token") token) {
    return this.commentsService.saveComment(body,token); 
  }
}
