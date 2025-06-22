import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Inject,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFactibilidadDto } from './dto/create-factibilidad.dto';
import { UpdateFactibilidadDto } from './dto/update-factibilidad.dto';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Controller('feasibilities')
@UseGuards(JwtAuthGuard)
export class FeasibilitiesController {
  constructor(
    @Inject('FEASIBILITIES_SERVICE')
    private readonly feasibilitiesClient: ClientProxy,
    @Inject('ACTIVITIES_SERVICE')
    private readonly activitiesClient: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    return firstValueFrom(
      this.feasibilitiesClient.send('find_all_feasibilities', {}),
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return firstValueFrom(
      this.feasibilitiesClient.send('find_feasibility_by_id', id),
    );
  }

  @Post()
  async create(
    @Body() dto: CreateFactibilidadDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(
      this.feasibilitiesClient.send('create_feasibility', dto));
    
      if (req.user?.id) {
        await firstValueFrom(this.activitiesClient.send('create-activity', {
          user: req.user.id,
          action: `Registro de una nueva factibilidad - ${data.code}`,
        }))
      
      return data;
    }
  }

  @Put(':id')
async update(
  @Param('id') id: string,
  @Body() body: any,
  @Req() req: any,
) {
  const dto = plainToInstance(UpdateFactibilidadDto, body);

  await validateOrReject(dto, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  const data = await firstValueFrom(
    this.feasibilitiesClient.send('update_feasibility', { id, dto })
  );

  if (req.user?.id) {
    await firstValueFrom(this.activitiesClient.send('create-activity', {
      user: req.user.id,
      action: `Actualización de factibilidad - ${data.code}`,
    }));
  }

  return data;
}

}
