import { IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  activity: string;

  @IsString()
  user: string;

  @IsString()
  content: string;
}
