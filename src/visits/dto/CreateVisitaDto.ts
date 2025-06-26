import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class EntidadDto {
  @IsString()
  tipo: string; // 'paciente' | 'sponsor' | 'regulatorio'

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  codigoPaciente?: string;

  @IsOptional()
  @IsString()
  codigoEstudio?: string;

  @IsOptional()
  @IsString()
  representante?: string;
}

class HistorialDto {
  @IsString()
  id: string;

  @IsDateString()
  fecha: string;

  @IsString()
  estado: string;

  @IsString()
  motivo: string;

  @IsOptional()
  @IsString()
  detalle?: string;
}

export class CreateVisitaDto {
  @IsString()
  tipo: string;

  @IsDateString()
  fechaProgramada: string;

  @IsOptional()
  @IsDateString()
  fechaReal?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsString()
  motivo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @ValidateNested()
  @Type(() => EntidadDto)
  entidad: EntidadDto;

  @IsOptional()
  @IsBoolean()
  cartaConfirmacion?: boolean;

  @IsOptional()
  @IsBoolean()
  fup?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HistorialDto)
  historial?: HistorialDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documentosAdjuntos?: string[];

  @IsOptional()
  @IsString()
  creadoPor?: string;

  @IsOptional()
  @IsDateString()
  creadoEn?: string;

  @IsOptional()
  numeroTomo?: number;

  @IsOptional()
  @IsString()
  detalle?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
