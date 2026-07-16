import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;

  @IsOptional()
  @IsNumber()
  folderId?: number;
}
