import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { CreateActivityDto } from './dto/activity.dto';
import { JwtRefreshGuard } from '../auth/guards/jwt-refresh.guard';
import { firstValueFrom } from 'rxjs';

@Controller('activities')
@UseGuards(JwtRefreshGuard)
export class ActivitiesController {
  constructor(
    @Inject('ACTIVITIES_SERVICE')
    private readonly activitiesClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() dto: CreateActivityDto) {
    return firstValueFrom(
      this.activitiesClient.send('create-activity', dto),
    );
  }

  @Get()
  async getAll() {
    return firstValueFrom(
      this.activitiesClient.send('get-activities', {}),
    );
  }

  @Get(':id/detail')
  async getDetail(@Param('id') id: string) {
    return firstValueFrom(
      this.activitiesClient.send('get-activity-detail', { _id: id }),
    );
  }
}
