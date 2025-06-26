import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateConsentimientoDto {
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
  url?: string;

  @IsOptional()
  @IsString()
  subidoPor?: string;
}
