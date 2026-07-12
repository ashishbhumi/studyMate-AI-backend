import { PartialType } from "@nestjs/mapped-types";
import { CreateFolderDto } from "./create-folder.dto";
import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;
}
