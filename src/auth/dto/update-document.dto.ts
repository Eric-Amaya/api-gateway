import { IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  name: string; // "GCP", "CV", etc.

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  @IsOptional()
  @IsBoolean()
  notApplicable?: boolean;

  @IsOptional()
  @IsDateString()
  createdAt?: string; // Optional field to track when the document was created

  
}
