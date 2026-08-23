import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from "class-validator";
import { DifficultyLevel } from "../entity/flashcard.entity";

export class GenerateFlashcardsDto {
  @IsNumber()
  @IsNotEmpty()
  noteId: number;

  @IsNumber()
  @IsOptional()
  @Min(5)
  @Max(20)
  count?: number = 10;

  @IsEnum(DifficultyLevel)
  @IsOptional()
  difficulty?: DifficultyLevel = DifficultyLevel.MEDIUM;
}
