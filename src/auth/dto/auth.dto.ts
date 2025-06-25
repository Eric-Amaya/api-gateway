import { IsArray, ValidateNested, IsOptional, IsString, IsInt, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';


export class LoginRequestDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}


class RequiredDocumentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  expirationDate?: string;

  @IsOptional()
  notApplicable?: boolean;

  @IsOptional()
  @IsString()
  createdAt?: string;
}

export class RegisterRequestDto extends LoginRequestDto {
  @IsString()
  public name: string;
  
  @IsInt()
  public age: number;

  @IsString()
  public rut: string;

  @IsString()
  public address: string;

  @IsString()
  public phone: string;

  @IsString()
  public birthdate: string;

  @IsString()
  public area: string;

  @IsString()
  public position: string;

  @IsString()
  public role: string;

  @IsString()
  public date_incorporation: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequiredDocumentDto)
  public requiredDocuments?: RequiredDocumentDto[];
}


export class ChangePasswordRequestDto {
    @IsEmail()
    public email: string;

    @IsString()
    public newPassword: string;

    @IsString()
    public confirmPassword: string;

    @IsString()
    public token: string;
}
