import { IsEmail, IsInt, IsString } from "class-validator";

export class LoginRequestDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
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
}

export class ChangePasswordRequestDto {
    @IsEmail()
    public email: string;

    @IsString()
    public newPassword: string;

    @IsString()
    public confirmPassword: string;
}
