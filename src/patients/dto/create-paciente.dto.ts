import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsDateString,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoPaciente } from '../enum';

export class ContactoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  parentesco: string;
}

export class ConsentimientoDto {
  @IsOptional()
  @IsDateString()
  fechaFirma?: string;

  @IsOptional()
  @IsDateString()
  fechaImplementacion?: string;

  @IsString()
  version: string;

  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  subidoPor: string;
}

export class CreatePacienteDto {

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  protocolo?: string;

  @IsString()
  nombre: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsEnum(EstadoPaciente, { message: 'Estado inválido' })
  estado: EstadoPaciente;

  @IsOptional()
  @IsDateString()
  fechaIngreso: string; // se usa como fecha de screaning 
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactoDto)
  contacto: ContactoDto[];

  @IsString()
  estudioId: string;

  @IsOptional()
  @IsString()
  codigo?: string;

  @IsOptional()
  @IsString()
  codigoRandomizado?: string;

  @IsOptional()
  @IsBoolean()
  estaRandomizado?: boolean;

  @IsOptional()
  @IsDateString()
  fechaRandomizacion?: string;

  @IsOptional()
  @IsString()
  rama?: string;

  @IsOptional()
  @IsString()
  centro?: string;

  @IsOptional()
  @IsString()
  vendedorKit?: string;

  @IsOptional()
  @IsString()
  traslado?: string;

  @IsOptional()
  @IsString()
  patologia?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsDateString()
  ultimaVisita?: string;

  @IsOptional()
  @IsBoolean()
  falloScreening?: boolean;

  @IsOptional()
  @IsDateString()
  fechaFalloScreening: string;

  @IsOptional()
  @IsString()
  residencia?: string;
  
  @IsOptional()
  @IsString()
  alergia?: string; //SI O NO PROXIMANENTE SERIA ALGO MAS DETALLADO DE MOMENTO SOLO SI O NO

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsentimientoDto)
  consentimientos?: ConsentimientoDto[];
}
