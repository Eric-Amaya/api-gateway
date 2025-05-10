import { IsInt, IsString } from "class-validator";
import { LoginRequestDto } from "./auth.dto";

export class UserRequestDto extends LoginRequestDto {
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