import { IsArray, IsUUID, IsNotEmpty } from "class-validator";

export class AttachTagsDto {
  @IsNotEmpty()
  @IsArray()
  @IsUUID("4", { each: true })
  tagIds: string[];
}
