import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { FlashcardRepository } from "../repositories/flashcard.repository";
import { FlashcardEntity, DifficultyLevel } from "../entity/flashcard.entity";
import { AiService } from "src/ai/services/ai.service";
import { NoteRepository } from "src/notes/repositories/note.repository";

interface FlashcardData {
  question: string;
  answer: string;
}

@Injectable()
export class FlashcardService {
  private readonly logger = new Logger(FlashcardService.name);

  constructor(
    private flashcardRepository: FlashcardRepository,
    private aiService: AiService,
    private noteRepository: NoteRepository,
  ) {}

  async generateFlashcards(
    noteId: number,
    userId: number,
    count: number,
    difficulty: DifficultyLevel,
  ): Promise<FlashcardEntity[]> {
    this.logger.log(
      `Generating flashcards for noteId: ${noteId}, userId: ${userId}`,
    );

    const note = await this.noteRepository.findByIdAndUserId(noteId, userId);
    if (!note) {
      throw new NotFoundException("Note not found");
    }

    const nextVersion =
      (await this.flashcardRepository.findLatestVersion(noteId)) + 1;

    const flashcardsData = await this.aiService.generateFlashcards(
      noteId,
      userId,
      count,
      difficulty,
    );

    if (!flashcardsData || !flashcardsData.flashcards) {
      throw new Error("Invalid flashcards response from AI");
    }

    const flashcards: FlashcardEntity[] = flashcardsData.flashcards.map(
      (fc: FlashcardData) => {
        const flashcard = new FlashcardEntity();
        flashcard.noteId = noteId;
        flashcard.version = nextVersion;
        flashcard.question = fc.question;
        flashcard.answer = fc.answer;
        flashcard.difficulty = difficulty;
        flashcard.topic = note.title;
        return flashcard;
      },
    );

    const savedFlashcards = await this.flashcardRepository
      .getRepository()
      .save(flashcards);

    this.logger.log(
      `Successfully generated ${savedFlashcards.length} flashcards for noteId: ${noteId}, version: ${nextVersion}`,
    );

    return savedFlashcards;
  }

  async getFlashcardsByNote(
    noteId: number,
    version?: number,
  ): Promise<FlashcardEntity[]> {
    if (version) {
      return this.flashcardRepository.findByNoteIdAndVersion(noteId, version);
    }
    return this.flashcardRepository.findByNoteId(noteId);
  }

  async deleteFlashcardsByVersion(
    noteId: number,
    version: number,
  ): Promise<void> {
    await this.flashcardRepository.deleteByVersion(noteId, version);
    this.logger.log(
      `Deleted flashcards for noteId: ${noteId}, version: ${version}`,
    );
  }

  async getVersions(noteId: number): Promise<number[]> {
    const flashcards = await this.flashcardRepository.findByNoteId(noteId);
    const versions = [...new Set(flashcards.map((fc) => fc.version))];
    return versions.sort((a, b) => b - a);
  }
}
