import { IsArray, IsNumber, IsNotEmpty } from "class-validator";

export class AttachTagsDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds: number[];
}
