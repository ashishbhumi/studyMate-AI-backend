import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from "@nestjs/common";
import { FoldersService } from "../services/folders.service";
import { CreateFolderDto } from "../dto/create-folder.dto";
import { UpdateFolderDto } from "../dto/update-folder.dto";
import { IFolderResponse } from "../interfaces/folder.interface";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller("folders")
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Post()
  async createFolder(
    @Request() req,
    @Body() createFolderDto: CreateFolderDto,
  ): Promise<IFolderResponse> {
    return this.foldersService.createFolder(req.user.sub, createFolderDto);
  }

  @Get()
  async getFolders(@Request() req): Promise<IFolderResponse[]> {
    return this.foldersService.getFolders(req.user.sub);
  }

  @Get(":id")
  async getFolderById(
    @Param("id") id: string,
    @Request() req,
  ): Promise<IFolderResponse> {
    return this.foldersService.getFolderById(id, req.user.sub);
  }

  @Patch(":id")
  async updateFolder(
    @Param("id") id: string,
    @Request() req,
    @Body() updateFolderDto: UpdateFolderDto,
  ): Promise<IFolderResponse> {
    return this.foldersService.updateFolder(id, req.user.sub, updateFolderDto);
  }

  @Delete(":id")
  async deleteFolder(
    @Param("id") id: string,
    @Request() req,
  ): Promise<void> {
    return this.foldersService.deleteFolder(id, req.user.sub);
  }
}
