import { Injectable, NotFoundException } from "@nestjs/common";
import { NoteRepository } from "../repositories/note.repository";
import { FolderRepository } from "../../folders/repositories/folder.repository";
import { CreateNoteDto } from "../dto/create-note.dto";
import { UpdateNoteDto } from "../dto/update-note.dto";
import { AttachTagsDto } from "../dto/attach-tags.dto";
import { Note } from "../note.entity";
import { Tag } from "../../tags/tag.entity";
import { INoteResponse } from "../interfaces/note.interface";
import { TagRepository } from "src/tags/repositories/tag.repository";

@Injectable()
export class NotesService {
  constructor(
    private noteRepository: NoteRepository,
    private folderRepository: FolderRepository,
    private tagRepository: TagRepository,
  ) {}

  async createNote(
    userId: number,
    createNoteDto: CreateNoteDto,
  ): Promise<INoteResponse> {
    if (createNoteDto.folderId) {
      const folder = await this.folderRepository.findByIdAndUserId(
        createNoteDto.folderId,
        userId,
      );
      if (!folder) {
        throw new NotFoundException("Folder not found");
      }
    }

    const note = new Note();
    note.title = createNoteDto.title;
    note.content = createNoteDto.content;
    note.coverImage = createNoteDto.coverImage;
    note.isPinned = createNoteDto.isPinned || false;
    note.isArchived = createNoteDto.isArchived || false;
    note.folderId = createNoteDto.folderId;
    note.userId = userId;

    const savedNote = await this.noteRepository.getRepository().save(note);

    return this.noteRepository.findByIdAndUserId(savedNote.id, userId);
  }

  async getNotes(
    userId: number,
    page: number = 1,
    limit: number = 10,
    sortBy: string = "createdAt",
    sortOrder: "ASC" | "DESC" = "DESC",
    filters?: { folderId?: number; isPinned?: boolean; isArchived?: boolean },
  ): Promise<{ data: INoteResponse[]; total: number }> {
    return this.noteRepository.findByUserIdWithPagination(
      userId,
      page,
      limit,
      sortBy,
      sortOrder,
      filters,
    );
  }

  async getNoteById(id: number, userId: number): Promise<INoteResponse> {
    const note = await this.noteRepository.findByIdAndUserId(id, userId);
    if (!note) {
      throw new NotFoundException("Note not found");
    }
    return note;
  }

  async updateNote(
    id: number,
    userId: number,
    updateNoteDto: UpdateNoteDto,
  ): Promise<INoteResponse> {
    const note = await this.noteRepository.findByIdAndUserId(id, userId);
    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (updateNoteDto.folderId) {
      const folder = await this.folderRepository.findByIdAndUserId(
        updateNoteDto.folderId,
        userId,
      );
      if (!folder) {
        throw new NotFoundException("Folder not found");
      }
    }

    Object.assign(note, updateNoteDto);

    const updatedNote = await this.noteRepository.getRepository().save(note);

    return this.noteRepository.findByIdAndUserId(updatedNote.id, userId);
  }

  async deleteNote(id: number, userId: number): Promise<void> {
    const note = await this.noteRepository.findByIdAndUserId(id, userId);
    if (!note) {
      throw new NotFoundException("Note not found");
    }

    await this.noteRepository.getRepository().delete(id);
  }

  async pinNote(id: number, userId: number): Promise<INoteResponse> {
    const note = await this.noteRepository.findByIdAndUserId(id, userId);
    if (!note) {
      throw new NotFoundException("Note not found");
    }

    note.isPinned = true;
    const updatedNote = await this.noteRepository.getRepository().save(note);

    return this.noteRepository.findByIdAndUserId(updatedNote.id, userId);
  }

  async unpinNote(id: number, userId: number): Promise<INoteResponse> {
    const note = await this.noteRepository.findByIdAndUserId(id, userId);
    if (!note) {
      throw new NotFoundException("Note not found");
    }

    note.isPinned = false;
    const updatedNote = await this.noteRepository.getRepository().save(note);

    return this.noteRepository.findByIdAndUserId(updatedNote.id, userId);
  }

  async archiveNote(id: number, userId: number): Promise<INoteResponse> {
    const note = await this.noteRepository.findByIdAndUserId(id, userId);
    if (!note) {
      throw new NotFoundException("Note not found");
    }

    note.isArchived = true;
    const updatedNote = await this.noteRepository.getRepository().save(note);

    return this.noteRepository.findByIdAndUserId(updatedNote.id, userId);
  }

  async unarchiveNote(id: number, userId: number): Promise<INoteResponse> {
    const note = await this.noteRepository.findByIdAndUserId(id, userId);
    if (!note) {
      throw new NotFoundException("Note not found");
    }

    note.isArchived = false;
    const updatedNote = await this.noteRepository.getRepository().save(note);

    return this.noteRepository.findByIdAndUserId(updatedNote.id, userId);
  }

  async attachTags(
    noteId: number,
    userId: number,
    attachTagsDto: AttachTagsDto,
  ): Promise<INoteResponse> {
    const note = await this.noteRepository.findByIdAndUserId(noteId, userId);
    if (!note) {
      throw new NotFoundException("Note not found");
    }

    const tags: Tag[] = [];
    for (const tagId of attachTagsDto.tagIds) {
      const tag = await this.tagRepository.findByIdAndUserId(tagId, userId);
      if (tag) {
        tags.push(tag);
      }
    }

    note.tags = tags;
    const updatedNote = await this.noteRepository.getRepository().save(note);

    return this.noteRepository.findByIdAndUserId(updatedNote.id, userId);
  }
}
