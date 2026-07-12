import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotesController } from "./controllers/notes.controller";
import { NotesService } from "./services/notes.service";
import { NoteRepository } from "./repositories/note.repository";
import { FolderRepository } from "../folders/repositories/folder.repository";
import { TagRepository } from "../tags/repositories/tag.repository";
import { Note } from "./note.entity";
import { Folder } from "../folders/folder.entity";
import { Tag } from "../tags/tag.entity";
import { getMysqlDataSource } from "../database/data-source";

@Module({
  imports: [
    TypeOrmModule.forFeature([Note, Folder, Tag], getMysqlDataSource()),
  ],
  controllers: [NotesController],
  providers: [NotesService, NoteRepository, FolderRepository, TagRepository],
  exports: [NotesService, NoteRepository],
})
export class NotesModule {}
