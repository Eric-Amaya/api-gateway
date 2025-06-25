import {
  IsInt,
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type, Transform, Expose } from 'class-transformer';
import { LoginRequestDto } from './auth.dto';

class RequiredDocumentDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  url?: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? value.toISOString().split('T')[0] : undefined)
  expirationDate?: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  notApplicable?: boolean;
}

export class UserRequestDto extends LoginRequestDto {
  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsInt()
  public age: number;

  @Expose()
  @IsString()
  public rut: string;

  @Expose()
  @IsString()
  public address: string;

  @Expose()
  @IsString()
  public phone: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  public birthdate: string;

  @Expose()
  @IsString()
  public area: string;

  @Expose()
  @IsString()
  public position: string;

  @Expose()
  @IsString()
  public role: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  public date_incorporation: string;

  @Expose()
  @IsBoolean()
  emailVerified: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  emailVerificationToken?: string;

  @Expose()
  @IsOptional()
  @IsString()
  changePasswordToken?: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  changePasswordTokenExpiration?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  resetPasswordTokenExpiration?: string | null;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequiredDocumentDto)
  public requiredDocuments: RequiredDocumentDto[];
}
