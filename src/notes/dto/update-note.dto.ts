import { PartialType } from "@nestjs/mapped-types";
import { CreateNoteDto } from "./create-note.dto";
import {
  IsOptional,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
} from "class-validator";

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title?: string;

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
}
