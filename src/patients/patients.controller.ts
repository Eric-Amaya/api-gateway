// patients.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { UpdateConsentimientoDto } from './dto/update-consentimiento.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientsController {
  constructor(
    @Inject('PATIENTS_SERVICE') 
      private readonly patientsClient: ClientProxy,
    @Inject('ACTIVITIES_SERVICE')
        private readonly activitiesClient: ClientProxy,
  ) {}

  @Post()
  async create(
    @Body() dto: CreatePacienteDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(this.patientsClient.send('create_patient', dto));

    if(req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Registro de un nuevo paciente - ${data.codigo}`,
      })); 
    }

    return data;
  }

  @Get()
  async findAll() {
    return await firstValueFrom(this.patientsClient.send('get_all_patients', {}));
  }

  @Get('study/:estudioId')
  async findByEstudio(@Param('estudioId') estudioId: string) {
    return await firstValueFrom(this.patientsClient.send('get_patients_by_study', estudioId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await firstValueFrom(this.patientsClient.send('get_patient_by_id', id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() dto: UpdatePacienteDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(this.patientsClient.send('update_patient', { id, dto }));
    
    if(req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Actualización de la información de un paciente - ${data.codigo}`,
      })); 
    }
    
    return data;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(this.patientsClient.send('delete_patient', id));
  
    if(req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Eliminación de un paciente - ${data.codigo}`,
      })); 
    }
    
    return data;

  }

  @Patch(':id/randomize')
  async randomizar(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(this.patientsClient.send('randomize_patient', id));
  
    if(req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Randomización de un paciente - ${data.codigo}`,
      })); 
    }

    return data;
  }

  @Patch(':id/consents')
  async addConsent(
    @Param('id') id: string, 
    @Body() dto: UpdateConsentimientoDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(this.patientsClient.send('add_consent', { id, dto }));
    
    if(req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Agregación del consentimiento de un paciente - ${data.codigo}`,
      })); 
    }

    return data;
  }

  @Patch(':id/consents/:version')
  async editConsent(
    @Param('id') id: string,
    @Param('version') version: string,
    @Body() dto: UpdateConsentimientoDto,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(
      this.patientsClient.send('edit_consent', { id, version, dto }),
    );

    if(req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Actualización del consentimiento de un paciente - ${data.codigo}`,
      })); 
    }

    return data;
  }

  @Delete(':id/consents/:version')
  async deleteConsent(
    @Param('id') id: string, 
    @Param('version') version: string,
    @Req() req: any,
  ) {
    const data = await firstValueFrom(
      this.patientsClient.send('delete_consent', { id, version }),
    );

    if(req.user?.id) {
      await firstValueFrom(this.activitiesClient.send('create-activity', {
        user: req.user.id,
        action: `Eliminación del consentimiento de un paciente - ${data.codigo}`,
      })); 
    }

    return data;
  }
}
