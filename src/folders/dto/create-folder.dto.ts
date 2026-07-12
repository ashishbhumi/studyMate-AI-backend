import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class CreateFolderDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;
}
