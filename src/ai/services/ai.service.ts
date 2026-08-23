import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { NoteRepository } from "../../notes/repositories/note.repository";
import { DifficultyLevel } from "src/flashcards/entity/flashcard.entity";

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private httpService: HttpService,
    private noteRepository: NoteRepository,
  ) {}

  async summarizeNote(noteId: number, userId: number): Promise<string> {
    this.logger.log(
      `Starting summary generation for noteId: ${noteId}, userId: ${userId}`,
    );

    const note = await this.noteRepository.findByIdAndUserId(noteId, userId);
    if (!note) {
      this.logger.error(
        `Note not found with id: ${noteId} for userId: ${userId}`,
      );
      throw new NotFoundException("Note not found");
    }

    if (!note.content) {
      this.logger.warn(`Note content is empty for noteId: ${noteId}`);
      throw new NotFoundException("Note content is empty");
    }

    this.logger.log(
      `Found note with title: "${note.title}", content length: ${note.content.length}`,
    );

    try {
      this.logger.log(
        `Calling AI service at http://localhost:8000/api/v1/summary`,
      );
      const response = await firstValueFrom(
        this.httpService.post("http://localhost:8000/api/v1/summary", {
          content: note.content,
        }),
      );

      const summary = (response.data as any).summary || (response.data as any);
      this.logger.log(
        `Received summary from AI service: ${summary.substring(0, 100)}...`,
      );

      note.summary = summary;
      await this.noteRepository.getRepository().save(note);
      this.logger.log(`Successfully saved summary for noteId: ${noteId}`);

      return summary;
    } catch (error) {
      this.logger.error(
        `Failed to generate summary for noteId: ${noteId}`,
        error,
      );
      throw new Error("Failed to generate summary");
    }
  }

  async generateFlashcards(
    noteId: number,
    userId: number,
    count: number,
    difficulty: DifficultyLevel,
  ): Promise<any> {
    this.logger.log(
      `Starting flashcard generation for noteId: ${noteId}, userId: ${userId}, count: ${count}, difficulty: ${difficulty}`,
    );

    const note = await this.noteRepository.findByIdAndUserId(noteId, userId);
    if (!note) {
      this.logger.error(
        `Note not found with id: ${noteId} for userId: ${userId}`,
      );
      throw new NotFoundException("Note not found");
    }

    if (!note.content) {
      this.logger.warn(`Note content is empty for noteId: ${noteId}`);
      throw new NotFoundException("Note content is empty");
    }

    this.logger.log(
      `Found note with title: "${note.title}", content length: ${note.content.length}`,
    );

    try {
      this.logger.log(
        `Calling AI service at http://localhost:8000/api/v1/flashcards/generate`,
      );

      const response = await firstValueFrom(
        this.httpService.post(
          "http://localhost:8000/api/v1/flashcards/generate",
          {
            note_content: note.content,
            count,
            difficulty,
          },
        ),
      );

      const flashcardsData = response.data;
      this.logger.log(
        `Received flashcards from AI service: ${JSON.stringify(flashcardsData).substring(0, 100)}...`,
      );

      return flashcardsData;
    } catch (error) {
      this.logger.error(
        `Failed to generate flashcards for noteId: ${noteId}`,
        error,
      );
      throw new Error("Failed to generate flashcards");
    }
  }
}
