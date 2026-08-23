import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FlashcardService } from "../services/flashcard.service";
import { GenerateFlashcardsDto } from "../dto/generate-flashcards.dto";
import { UserIdentity } from "src/common/decorators/user-identity.decorator";

@ApiTags("Flashcards")
@Controller("flashcards")
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Post("generate")
  @ApiOperation({ summary: "Generate flashcards for a note" })
  @ApiResponse({
    status: 200,
    description: "Flashcards generated successfully",
  })
  async generate(
    @UserIdentity() userIdentity: { userId: number },
    @Body() generateDto: GenerateFlashcardsDto,
  ) {
    const flashcards = await this.flashcardService.generateFlashcards(
      generateDto.noteId,
      userIdentity.userId,
      generateDto.count || 10,
      generateDto.difficulty,
    );
    return { flashcards };
  }

  @Get("note/:noteId")
  @ApiOperation({ summary: "Get flashcards for a note" })
  @ApiResponse({
    status: 200,
    description: "Flashcards retrieved successfully",
  })
  async getByNote(
    @Param("noteId") noteId: number,
    @Query("version") version?: number,
  ) {
    const flashcards = await this.flashcardService.getFlashcardsByNote(
      noteId,
      version ? parseInt(version.toString()) : undefined,
    );
    return { flashcards };
  }

  @Get("note/:noteId/versions")
  @ApiOperation({ summary: "Get all versions for a note" })
  @ApiResponse({ status: 200, description: "Versions retrieved successfully" })
  async getVersions(@Param("noteId") noteId: number) {
    const versions = await this.flashcardService.getVersions(noteId);
    return { versions };
  }

  @Delete("note/:noteId/version/:version")
  @ApiOperation({ summary: "Delete a specific version of flashcards" })
  @ApiResponse({ status: 200, description: "Flashcards deleted successfully" })
  async deleteByVersion(
    @Param("noteId") noteId: number,
    @Param("version") version: number,
  ) {
    await this.flashcardService.deleteFlashcardsByVersion(noteId, version);
    return { message: "Flashcards deleted successfully" };
  }
}
