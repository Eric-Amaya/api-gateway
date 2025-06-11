import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  Inject,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEstudioDto } from './dtos/create-estudio.dto';
import { MiembroEquipoDto } from './dtos/asignar-equipo.dto';
import { UpdateAgentesDto } from './dtos/update-agentes.dto';
import { UpdateDocumentosDto } from './dtos/update-documentos.dto';
import { UpdateEstudioDto } from './dtos/update-estudio.dto';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('studies')
@UseGuards(JwtAuthGuard)
export class StudiesController {
  constructor(
    @Inject('STUDIES_SERVICE') private readonly studiesClient: ClientProxy,
    @Inject('ACTIVITIES_SERVICE') private readonly activitiesClient: ClientProxy,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateEstudioDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(
      this.studiesClient.send('crear_estudio_desde_factibilidad', dto),
    );

    if (req.user?.id) {
      await firstValueFrom(
        this.activitiesClient.send('create-activity', {
          user: req.user.id,
          action: `Registro de un nuevo estudio - ${data.titulo}`,
        }),
      );
    }

    return data;
  }

  @Get()
  async findAll() {
    return firstValueFrom(this.studiesClient.send('get_all_studies', {}));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return firstValueFrom(this.studiesClient.send('get_study_by_id', id));
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string, 
    @Body() dto: UpdateEstudioDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(
      this.studiesClient.send('update_study', { id, dto }));

    if (req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Actualización del estudio - ${data.titulo}`,
      }));
    }

    return data;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id') id: string,
    @Req() req: any,
  ){
    const data = await firstValueFrom(
      this.studiesClient.send('delete_study', id));

    if (req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Eliminación del estudio - ${data.titulo}`,
      }))
    }  

    return data;
  }

  @Patch(':id/equipo')
  async asignarEquipo(
    @Param('id') id: string, 
    @Body() dto: MiembroEquipoDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(
      this.studiesClient.send('asignar_equipo', { id, equipo: [dto] }));
    
      if (req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Asignación de un miembro al equipo del estudio - ${data.titulo}`,
      }));
    }
    return data;
  }

  @Patch(':id/agentes')
  async updateAgentes(
    @Param('id') id: string, 
    @Body() dto: UpdateAgentesDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(
      this.studiesClient.send('update_agentes', { id, agentes: dto.agentes }));
    
    if (req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Actualización de agentes del estudio - ${data.titulo}`,
      }));
    }

    return data;
  }

  @Patch(':id/documentos')
  async updateDocumentos(
    @Param('id') id: string,
    @Body() dto: UpdateDocumentosDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(
      this.studiesClient.send('update_documentos', { id, documentos: dto.documentos }));
    
    if (req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Actualización de documentos del estudio - ${data.titulo}`,
      }));
    }

    return data;
  }
}
// 