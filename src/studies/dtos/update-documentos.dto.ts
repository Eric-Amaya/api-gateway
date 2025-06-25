import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DocumentoProyectoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  fecha?: string;

  @IsOptional()
  @IsString()
  url?: string;
}

export class UpdateDocumentosDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentoProyectoDto)
  documentos: DocumentoProyectoDto[];
}
