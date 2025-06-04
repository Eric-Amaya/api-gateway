import {
  IsString,
  IsOptional,
  IsIn,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsDate
} from 'class-validator';
import { Type } from 'class-transformer';

class EntidadDto {
  @IsIn(['paciente', 'sponsor', 'regulatorio'])
  tipo: 'paciente' | 'sponsor' | 'regulatorio';

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

export class CreateVisitaDto {
  @IsIn(['paciente', 'sponsor', 'regulatorio'])
  tipo: string;

  @IsString()
  motivo: string;

  @IsDate()
  @Type(() => Date)
  fechaProgramada: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaReal?: Date;

  @IsOptional()
  @IsIn(['programada', 'realizada', 'reagendada', 'cancelada', 'confirmada'])
  estado?: string;

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
  @IsString({ each: true })
  representantes?: string[];

  @IsOptional()
  @IsArray()
  historial?: {
    id: string;
    fecha: Date;
    estado: string;
    motivo: string;
  }[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documentosAdjuntos?: string[];

  @IsOptional()
  @IsString()
  creadoPor?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  creadoEn?: Date;

  @IsOptional()
  numeroTomo?: number;
}
