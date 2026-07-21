import { IsNumber, IsNotEmpty } from "class-validator";

export class SummarizeDto {
  @IsNumber()
  @IsNotEmpty()
  noteId: number;
}
