import { PartialType } from '@nestjs/mapped-types';
import { CreateFactibilidadDto } from './create-factibilidad.dto';

export class UpdateFactibilidadDto extends PartialType(CreateFactibilidadDto) {}
