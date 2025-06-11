import { Controller, Inject, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(
    @Inject('COMMENTS_SERVICE') private readonly commentsClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() dto: CreateCommentDto) {
    return this.commentsClient.send('create_comment', dto);
  }

  @Get()
  async getByActivity(@Query('activity') activityId: string) {
    return this.commentsClient.send('get_comments', activityId);
  }
}
