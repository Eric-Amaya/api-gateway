// patients.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { JwtRefreshGuard } from '../auth/guards/jwt-refresh.guard';
import { firstValueFrom } from 'rxjs';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { UpdateConsentimientoDto } from './dto/update-consentimiento.dto';

@Controller('patients')
export class PatientsController {
  constructor(
    @Inject('PATIENTS_SERVICE') private readonly patientsClient: ClientProxy,
  ) {}

  @Post()
  @UseGuards(JwtRefreshGuard)
  create(@Body() dto: CreatePacienteDto) {
    return firstValueFrom(this.patientsClient.send('create_patient', dto));
  }

  @Get()
  @UseGuards(JwtRefreshGuard)
  findAll() {
    return firstValueFrom(this.patientsClient.send('get_all_patients', {}));
  }

  @Get('study/:estudioId')
  @UseGuards(JwtRefreshGuard)
  findByEstudio(@Param('estudioId') estudioId: string) {
    return firstValueFrom(this.patientsClient.send('get_patients_by_study', estudioId));
  }

  @Get(':id')
  @UseGuards(JwtRefreshGuard)
  findOne(@Param('id') id: string) {
    return firstValueFrom(this.patientsClient.send('get_patient_by_id', id));
  }

  @Patch(':id')
  @UseGuards(JwtRefreshGuard)
  update(@Param('id') id: string, @Body() dto: UpdatePacienteDto) {
    return firstValueFrom(this.patientsClient.send('update_patient', { id, dto }));
  }

  @Delete(':id')
  @UseGuards(JwtRefreshGuard)
  remove(@Param('id') id: string) {
    return firstValueFrom(this.patientsClient.send('delete_patient', id));
  }

  @Patch(':id/randomize')
  @UseGuards(JwtRefreshGuard)
  randomizar(@Param('id') id: string) {
    return firstValueFrom(this.patientsClient.send('randomize_patient', id));
  }

  @Patch(':id/consents')
  @UseGuards(JwtRefreshGuard)
  addConsent(@Param('id') id: string, @Body() dto: UpdateConsentimientoDto) {
    return firstValueFrom(this.patientsClient.send('add_consent', { id, dto }));
  }

  @Patch(':id/consents/:version')
  @UseGuards(JwtRefreshGuard)
  editConsent(
    @Param('id') id: string,
    @Param('version') version: string,
    @Body() dto: UpdateConsentimientoDto,
  ) {
    return firstValueFrom(
      this.patientsClient.send('edit_consent', { id, version, dto }),
    );
  }

  @Delete(':id/consents/:version')
  @UseGuards(JwtRefreshGuard)
  deleteConsent(@Param('id') id: string, @Param('version') version: string) {
    return firstValueFrom(
      this.patientsClient.send('delete_consent', { id, version }),
    );
  }
}
