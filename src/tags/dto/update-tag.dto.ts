import { PartialType } from "@nestjs/mapped-types";
import { CreateTagDto } from "./create-tag.dto";
import { IsOptional, IsString, MinLength, MaxLength } from "class-validator";

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;
}
