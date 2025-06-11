import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RolEquipo } from '../enums';

export class DocumentoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  expirationDate?: string;

  @IsOptional()
  @IsBoolean()
  notApplicable?: boolean;

  @IsOptional()
  @IsString()
  createdAt?: string;
}

export class MiembroEquipoDto {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @IsEnum(RolEquipo)
  rol: RolEquipo;

  @IsString()
  email: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentoDto)
  requiredDocuments?: DocumentoDto[];
}

export class AsignarEquipoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MiembroEquipoDto)
  equipo: MiembroEquipoDto[];
}
