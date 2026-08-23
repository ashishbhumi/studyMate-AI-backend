import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FlashcardController } from "./controllers/flashcard.controller";
import { FlashcardService } from "./services/flashcard.service";
import { FlashcardRepository } from "./repositories/flashcard.repository";
import { FlashcardEntity } from "./entity/flashcard.entity";
import { getMysqlDataSource } from "src/database/data-source";
import { AiModule } from "src/ai/ai.module";
import { NotesModule } from "src/notes/notes.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([FlashcardEntity], getMysqlDataSource()),
    NotesModule,
    AiModule,
  ],
  controllers: [FlashcardController],
  providers: [FlashcardService, FlashcardRepository],
  exports: [FlashcardService, FlashcardRepository],
})
export class FlashcardsModule {}
