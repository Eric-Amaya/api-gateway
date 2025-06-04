import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitaDto } from './CreateVisitaDto';

export class UpdateVisitaDto extends PartialType(CreateVisitaDto) {}
