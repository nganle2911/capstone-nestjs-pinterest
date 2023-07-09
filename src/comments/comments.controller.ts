import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Get comments by image_id
  @Get("get-comments-by-img-id/:image_id")
  getCommentsByImgId(@Param("image_id") image_id: number) {
    return this.commentsService.getCommentsByImgId(+image_id)
  }
  
}
