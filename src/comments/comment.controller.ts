import { Controller, Inject, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/comment.dto';
import { JwtRefreshGuard } from '../auth/guards/jwt-refresh.guard';

@Controller('comments')
export class CommentsController {
  constructor(
    @Inject('COMMENTS_SERVICE') private readonly commentsClient: ClientProxy,
  ) {}

  @Post()
  @UseGuards(JwtRefreshGuard)
  async create(@Body() dto: CreateCommentDto) {
    return this.commentsClient.send('create_comment', dto);
  }

  @Get()
  @UseGuards(JwtRefreshGuard)
  async getByActivity(@Query('activity') activityId: string) {
    return this.commentsClient.send('get_comments', activityId);
  }
}
