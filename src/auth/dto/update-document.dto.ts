import { IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  @IsOptional()
  @IsBoolean()
  notApplicable?: boolean;
}
