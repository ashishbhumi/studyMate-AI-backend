import { Injectable, NotFoundException } from "@nestjs/common";
import { TagRepository } from "../repositories/tag.repository";
import { CreateTagDto } from "../dto/create-tag.dto";
import { UpdateTagDto } from "../dto/update-tag.dto";
import { Tag } from "../tag.entity";
import { ITagResponse } from "../interfaces/tag.interface";

@Injectable()
export class TagsService {
  constructor(private tagRepository: TagRepository) {}

  async createTag(
    userId: number,
    createTagDto: CreateTagDto,
  ): Promise<ITagResponse> {
    const tag = new Tag();
    tag.name = createTagDto.name;
    tag.userId = userId;

    const savedTag = await this.tagRepository.getRepository().save(tag);

    return savedTag;
  }

  async getTags(userId: number): Promise<ITagResponse[]> {
    return this.tagRepository.findByUserId(userId);
  }

  async getTagById(id: number, userId: number): Promise<ITagResponse> {
    const tag = await this.tagRepository.findByIdAndUserId(id, userId);
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }
    return tag;
  }

  async updateTag(
    id: number,
    userId: number,
    updateTagDto: UpdateTagDto,
  ): Promise<ITagResponse> {
    const tag = await this.tagRepository.findByIdAndUserId(id, userId);
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    if (updateTagDto.name) {
      tag.name = updateTagDto.name;
    }

    const updatedTag = await this.tagRepository.getRepository().save(tag);

    return updatedTag;
  }

  async deleteTag(id: number, userId: number): Promise<void> {
    const tag = await this.tagRepository.findByIdAndUserId(id, userId);
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    await this.tagRepository.getRepository().delete(id);
  }
}
