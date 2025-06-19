import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudioDto } from './create-estudio.dto';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateEstudioDto extends PartialType(CreateEstudioDto) {
  @IsOptional()
  @IsDateString()
  createdAt?: string;
}