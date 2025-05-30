import { IsString, IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  action: string;
}

export class ActivityDto {
  id: string;
  user: string;
  action: string;
  timestamp?: Date;
}
