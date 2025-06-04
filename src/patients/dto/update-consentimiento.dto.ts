import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateConsentimientoDto {
  @IsOptional()
  @IsDateString()
  fechaFirma?: string;

  @IsString()
  version: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  subidoPor?: string;
}
