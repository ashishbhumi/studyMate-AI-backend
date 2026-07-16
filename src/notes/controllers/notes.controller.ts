import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { NotesService } from "../services/notes.service";
import { CreateNoteDto } from "../dto/create-note.dto";
import { UpdateNoteDto } from "../dto/update-note.dto";
import { AttachTagsDto } from "../dto/attach-tags.dto";
import { INoteResponse } from "../interfaces/note.interface";
import { UserIdentity } from "../../common/decorators/user-identity.decorator";

@ApiTags("Notes")
@Controller("notes")
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new note" })
  @ApiResponse({ status: 201, description: "Note created successfully" })
  async createNote(
    @UserIdentity() userIdentity: { userId: string },
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<INoteResponse> {
    return this.notesService.createNote(userIdentity.userId, createNoteDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all notes with pagination, sorting, and filtering",
  })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "sort", required: false, type: String })
  @ApiQuery({ name: "order", required: false, enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "folderId", required: false, type: String })
  @ApiQuery({ name: "isPinned", required: false, type: Boolean })
  @ApiQuery({ name: "isArchived", required: false, type: Boolean })
  @ApiResponse({ status: 200, description: "Notes retrieved successfully" })
  async getNotes(
    @UserIdentity() userIdentity: { userId: string },
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
      userIdentity.userId,
      parseInt(page),
      parseInt(limit),
      sort,
      order,
      Object.keys(filters).length > 0 ? filters : undefined,
    );
  }

  @Get(":id")
  @ApiOperation({ summary: "Get note by ID" })
  @ApiResponse({ status: 200, description: "Note retrieved successfully" })
  async getNoteById(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
  ): Promise<INoteResponse> {
    return this.notesService.getNoteById(id, userIdentity.userId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update note" })
  @ApiResponse({ status: 200, description: "Note updated successfully" })
  async updateNote(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<INoteResponse> {
    return this.notesService.updateNote(id, userIdentity.userId, updateNoteDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete note" })
  @ApiResponse({ status: 200, description: "Note deleted successfully" })
  async deleteNote(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
  ): Promise<void> {
    return this.notesService.deleteNote(id, userIdentity.userId);
  }

  @Patch(":id/pin")
  @ApiOperation({ summary: "Pin note" })
  @ApiResponse({ status: 200, description: "Note pinned successfully" })
  async pinNote(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
  ): Promise<INoteResponse> {
    return this.notesService.pinNote(id, userIdentity.userId);
  }

  @Patch(":id/unpin")
  @ApiOperation({ summary: "Unpin note" })
  @ApiResponse({ status: 200, description: "Note unpinned successfully" })
  async unpinNote(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
  ): Promise<INoteResponse> {
    return this.notesService.unpinNote(id, userIdentity.userId);
  }

  @Patch(":id/archive")
  @ApiOperation({ summary: "Archive note" })
  @ApiResponse({ status: 200, description: "Note archived successfully" })
  async archiveNote(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
  ): Promise<INoteResponse> {
    return this.notesService.archiveNote(id, userIdentity.userId);
  }

  @Patch(":id/unarchive")
  @ApiOperation({ summary: "Unarchive note" })
  @ApiResponse({ status: 200, description: "Note unarchived successfully" })
  async unarchiveNote(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
  ): Promise<INoteResponse> {
    return this.notesService.unarchiveNote(id, userIdentity.userId);
  }

  @Post(":id/tags")
  @ApiOperation({ summary: "Attach tags to note" })
  @ApiResponse({ status: 200, description: "Tags attached successfully" })
  async attachTags(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
    @Body() attachTagsDto: AttachTagsDto,
  ): Promise<INoteResponse> {
    return this.notesService.attachTags(id, userIdentity.userId, attachTagsDto);
  }
}
