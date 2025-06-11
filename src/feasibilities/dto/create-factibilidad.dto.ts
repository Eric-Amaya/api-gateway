import {
  IsString,
  IsOptional,
  IsIn,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNumber
} from 'class-validator';
import { Type } from 'class-transformer';
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
  @IsString()
  speciality?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  instructionsSummary?: string;

  @IsOptional()
  @IsNumber()
  patientsCommitment?: number;

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

  @IsIn(['pendiente', 'en revisión', 'seleccionado'])
  estadoProceso: string;

  @IsBoolean()
  informacionCompleta: boolean;
}
