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
import { TagsService } from "../services/tags.service";
import { CreateTagDto } from "../dto/create-tag.dto";
import { UpdateTagDto } from "../dto/update-tag.dto";
import { ITagResponse } from "../interfaces/tag.interface";
import { UserIdentity } from "../../common/decorators/user-identity.decorator";

@ApiTags("Tags")
@Controller("tags")
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new tag" })
  @ApiResponse({ status: 201, description: "Tag created successfully" })
  async createTag(
    @UserIdentity() userIdentity: { userId: string },
    @Body() createTagDto: CreateTagDto,
  ): Promise<ITagResponse> {
    return this.tagsService.createTag(userIdentity.userId, createTagDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tags" })
  @ApiResponse({ status: 200, description: "Tags retrieved successfully" })
  async getTags(
    @UserIdentity() userIdentity: { userId: string },
  ): Promise<ITagResponse[]> {
    return this.tagsService.getTags(userIdentity.userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get tag by ID" })
  @ApiResponse({ status: 200, description: "Tag retrieved successfully" })
  async getTagById(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
  ): Promise<ITagResponse> {
    return this.tagsService.getTagById(id, userIdentity.userId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update tag" })
  @ApiResponse({ status: 200, description: "Tag updated successfully" })
  async updateTag(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<ITagResponse> {
    return this.tagsService.updateTag(id, userIdentity.userId, updateTagDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete tag" })
  @ApiResponse({ status: 200, description: "Tag deleted successfully" })
  async deleteTag(
    @Param("id") id: string,
    @UserIdentity() userIdentity: { userId: string },
  ): Promise<void> {
    return this.tagsService.deleteTag(id, userIdentity.userId);
  }
}
