import { IsArray, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AgenteDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone_number?: string;
}

export class UpdateAgentesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AgenteDto)
  agentes: AgenteDto[];
}
