import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumber,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoEstudio, TipoDroga, TipoEnrolamiento, RolEquipo } from '../enums';

// Sub-DTOs

export class AgentDto {
  @IsString() name: string;
  @IsString() email: string;
  @IsOptional() @IsString() phone_number?: string;
  @IsOptional() @IsString() funcion?: string;
}

export class EquipoDto {
  @IsString() nombre: string;

  @IsOptional()
  @IsEnum(RolEquipo)
  rol?: RolEquipo;

  @IsOptional()
  @IsString()
  email?: string;
}

export class DocumentoDto {
  @IsString() nombre: string;

  @IsOptional() @IsString() version?: string;
  @IsOptional() @IsDateString() fecha?: string;
  @IsOptional() @IsString() url?: string;
}

// DTO principal

export class CreateEstudioDto {
  // 🧠 INFORMACIÓN GENERAL DEL ESTUDIO
  
  @IsOptional() @IsString() protocolo?: string;
  @IsOptional() @IsString() titulo?: string;
  @IsOptional() @IsString() patologia?: string;
  @IsOptional() @IsString() productoInvestigacion?: string;
  @IsOptional() @IsString() moleculaInvestigacion?: string;
  @IsOptional() @IsString() area?: string;
  @IsOptional() @IsString() sponsor?: string;
  @IsOptional() @IsString() fase?: string;
  @IsOptional() @IsString() siteNumber?: string;

  @IsOptional()
  @IsEnum(EstadoEstudio)
  estado?: EstadoEstudio;

  @IsOptional()
  @IsEnum(TipoDroga)
  tipoDroga?: TipoDroga;

  @IsOptional() @IsString() comite?: string;
  @IsOptional() @IsString() investigadorPrincipal?: string;
  @IsOptional() @IsString() emailContacto?: string;

  @IsOptional()
  @IsEnum(TipoEnrolamiento)
  tipoEnrolamiento?: TipoEnrolamiento;

  // 👥 EQUIPO Y DOCUMENTOS
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AgentDto)
  agentes?: AgentDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EquipoDto)
  equipo?: EquipoDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentoDto)
  documentos?: DocumentoDto[];

  @IsOptional() @IsString() proposalId?: string;

  // 📆 FECHAS CLAVE
  @IsOptional() @IsDateString() llegadaPaqueteInicial?: string;
  @IsOptional() @IsDateString() sometimientoInicial?: string;
  @IsOptional() @IsDateString() fechaAprobacionSometimiento?: string;
  @IsOptional() @IsDateString() siteReady?: string;
  @IsOptional() @IsDateString() visitaInicio?: string;
  @IsOptional() @IsDateString() primerFci?: string;
  @IsOptional() @IsDateString() primeraVisita?: string;
  @IsOptional() @IsDateString() inicioReclutamiento?: string;
  @IsOptional() @IsDateString() primerScreening?: string;
  @IsOptional() @IsDateString() primerPacienteEnrolado?: string;
  @IsOptional() @IsDateString() ultimaVisita?: string;
  @IsOptional() @IsDateString() cierreReclutamiento?: string;
  @IsOptional() @IsDateString() visitaCierre?: string;
  @IsOptional() @IsDateString() fechaCierreEstudio?: string;
  

  // ⏳ DURACIÓN
  @IsOptional()
  @IsNumber()
  duracionEstudio?: number;

  // 📊 INDICADORES
  @IsOptional() @IsNumber() compromisoPacientes?: number;
  @IsOptional() @IsNumber() pacientesTotales?: number;
  @IsOptional() @IsString() objetivoEstudio?: string;

  // 🕓 METADATOS
  @IsOptional() @IsString() resolucionAprobatoria?: string;
}
