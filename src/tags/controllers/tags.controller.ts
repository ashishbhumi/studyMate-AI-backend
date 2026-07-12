import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from "@nestjs/common";
import { TagsService } from "../services/tags.service";
import { CreateTagDto } from "../dto/create-tag.dto";
import { UpdateTagDto } from "../dto/update-tag.dto";
import { ITagResponse } from "../interfaces/tag.interface";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller("tags")
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  async createTag(
    @Request() req,
    @Body() createTagDto: CreateTagDto,
  ): Promise<ITagResponse> {
    return this.tagsService.createTag(req.user.sub, createTagDto);
  }

  @Get()
  async getTags(@Request() req): Promise<ITagResponse[]> {
    return this.tagsService.getTags(req.user.sub);
  }

  @Get(":id")
  async getTagById(
    @Param("id") id: string,
    @Request() req,
  ): Promise<ITagResponse> {
    return this.tagsService.getTagById(id, req.user.sub);
  }

  @Patch(":id")
  async updateTag(
    @Param("id") id: string,
    @Request() req,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<ITagResponse> {
    return this.tagsService.updateTag(id, req.user.sub, updateTagDto);
  }

  @Delete(":id")
  async deleteTag(
    @Param("id") id: string,
    @Request() req,
  ): Promise<void> {
    return this.tagsService.deleteTag(id, req.user.sub);
  }
}
