import {
  IsString,
  IsOptional,
  IsIn,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNumber,
  IsDateString
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { EstadoFactibilidad } from '../enum';

export class AgentDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone_number: string;
}

export class CreateFactibilidadDto {
  @IsString()
  proposalId: string;

  @IsString()
  code: string;

  @IsString()
  sponsorName: string;

   @IsOptional()
  @IsString()
  patologia?: string;

  @IsOptional()
  @IsString()
  productoInvestigacion?: string;
  
  @IsOptional()
  @IsString()
  email?: string;

  @IsEnum(EstadoFactibilidad, { message: 'Estado de factibilidad no válido' })
  feasibilityStatus: EstadoFactibilidad;


  @IsIn(['SI', 'NO', 'N/A'])
  feasibilityValue: string;

  @IsIn(['SI', 'NO'])
  interest: string;

  @IsOptional()
  @IsString()
  initialEmail?: string;

  @IsOptional()
  @IsString()
  documentArrivalDate?: string;

  @IsOptional()
  @IsString()
  visitDate?: string;

  @IsOptional()
  @IsString()
  feasibilitySentDate?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  cdaSentDate?: string;
  
  @IsOptional()
  @IsDateString()
  recruitmentStart?: string; // nuevo campo, fecha de inicio del reclutamiento

  @IsOptional()
  @IsDateString()
  recruitmentEnd?: string; // nuevo campo, fecha de fin del reclutamiento

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Debe ser un número' })
  patientsCommitmentICLSR?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Debe ser un número' })
  patientsCommitment?: number;


  @IsOptional()
  @IsString()
  speciality?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  instructionsSummary?: string;

  @IsOptional()
  @IsString()
  recruitmentPeriod?: string;

  @IsOptional()
  @IsString()
  principalInvestigator?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AgentDto)
  agents?: AgentDto[];

  @IsOptional()
  @IsString()
  @IsIn(['pendiente', 'en revisión', 'seleccionado' , 'no seleccionado'])
  estadoProceso: string;

  @IsBoolean()
  informacionCompleta: boolean;
}
