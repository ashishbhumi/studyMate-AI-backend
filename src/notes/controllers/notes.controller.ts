import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { NotesService } from "../services/notes.service";
import { CreateNoteDto } from "../dto/create-note.dto";
import { UpdateNoteDto } from "../dto/update-note.dto";
import { AttachTagsDto } from "../dto/attach-tags.dto";
import { INoteResponse } from "../interfaces/note.interface";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller("notes")
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async createNote(
    @Request() req,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<INoteResponse> {
    return this.notesService.createNote(req.user.sub, createNoteDto);
  }

  @Get()
  async getNotes(
    @Request() req,
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
    @Query("sort") sort: string = "createdAt",
    @Query("order") order: "ASC" | "DESC" = "DESC",
    @Query("folderId") folderId?: string,
    @Query("isPinned") isPinned?: string,
    @Query("isArchived") isArchived?: string,
  ): Promise<{ data: INoteResponse[]; total: number }> {
    const filters: any = {};
    if (folderId) filters.folderId = folderId;
    if (isPinned !== undefined) filters.isPinned = isPinned === "true";
    if (isArchived !== undefined) filters.isArchived = isArchived === "true";

    return this.notesService.getNotes(
      req.user.sub,
      parseInt(page),
      parseInt(limit),
      sort,
      order,
      Object.keys(filters).length > 0 ? filters : undefined,
    );
  }

  @Get(":id")
  async getNoteById(
    @Param("id") id: string,
    @Request() req,
  ): Promise<INoteResponse> {
    return this.notesService.getNoteById(id, req.user.sub);
  }

  @Patch(":id")
  async updateNote(
    @Param("id") id: string,
    @Request() req,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<INoteResponse> {
    return this.notesService.updateNote(id, req.user.sub, updateNoteDto);
  }

  @Delete(":id")
  async deleteNote(@Param("id") id: string, @Request() req): Promise<void> {
    return this.notesService.deleteNote(id, req.user.sub);
  }

  @Patch(":id/pin")
  async pinNote(
    @Param("id") id: string,
    @Request() req,
  ): Promise<INoteResponse> {
    return this.notesService.pinNote(id, req.user.sub);
  }

  @Patch(":id/unpin")
  async unpinNote(
    @Param("id") id: string,
    @Request() req,
  ): Promise<INoteResponse> {
    return this.notesService.unpinNote(id, req.user.sub);
  }

  @Patch(":id/archive")
  async archiveNote(
    @Param("id") id: string,
    @Request() req,
  ): Promise<INoteResponse> {
    return this.notesService.archiveNote(id, req.user.sub);
  }

  @Patch(":id/unarchive")
  async unarchiveNote(
    @Param("id") id: string,
    @Request() req,
  ): Promise<INoteResponse> {
    return this.notesService.unarchiveNote(id, req.user.sub);
  }

  @Post(":id/tags")
  async attachTags(
    @Param("id") id: string,
    @Request() req,
    @Body() attachTagsDto: AttachTagsDto,
  ): Promise<INoteResponse> {
    return this.notesService.attachTags(id, req.user.sub, attachTagsDto);
  }
}
