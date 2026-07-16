import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FoldersService } from "../services/folders.service";
import { CreateFolderDto } from "../dto/create-folder.dto";
import { UpdateFolderDto } from "../dto/update-folder.dto";
import { IFolderResponse } from "../interfaces/folder.interface";
import { UserIdentity } from "../../common/decorators/user-identity.decorator";

@ApiTags("Folders")
@Controller("folders")
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new folder" })
  @ApiResponse({ status: 201, description: "Folder created successfully" })
  async createFolder(
    @UserIdentity() userIdentity: { userId: number },
    @Body() createFolderDto: CreateFolderDto,
  ): Promise<IFolderResponse> {
    return this.foldersService.createFolder(
      userIdentity.userId,
      createFolderDto,
    );
  }

  @Get()
  @ApiOperation({ summary: "Get all folders" })
  @ApiResponse({ status: 200, description: "Folders retrieved successfully" })
  async getFolders(
    @UserIdentity() userIdentity: { userId: number },
  ): Promise<IFolderResponse[]> {
    return this.foldersService.getFolders(userIdentity.userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get folder by ID" })
  @ApiResponse({ status: 200, description: "Folder retrieved successfully" })
  async getFolderById(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: number },
  ): Promise<IFolderResponse> {
    return this.foldersService.getFolderById(parseInt(id), userIdentity.userId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update folder" })
  @ApiResponse({ status: 200, description: "Folder updated successfully" })
  async updateFolder(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: number },
    @Body() updateFolderDto: UpdateFolderDto,
  ): Promise<IFolderResponse> {
    return this.foldersService.updateFolder(
      parseInt(id),
      userIdentity.userId,
      updateFolderDto,
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete folder" })
  @ApiResponse({ status: 200, description: "Folder deleted successfully" })
  async deleteFolder(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: number },
  ): Promise<void> {
    return this.foldersService.deleteFolder(parseInt(id), userIdentity.userId);
  }
}
