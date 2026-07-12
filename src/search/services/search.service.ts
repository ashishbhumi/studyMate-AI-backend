import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "../../notes/note.entity";
import { getMysqlDataSource } from "../../database/data-source";
import { SearchDto } from "../dto/search.dto";
import { INoteResponse } from "../../notes/interfaces/note.interface";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Note, getMysqlDataSource())
    private noteRepository: Repository<Note>,
  ) {}

  async searchNotes(
    userId: string,
    searchDto: SearchDto,
  ): Promise<{ data: INoteResponse[]; total: number }> {
    const { keyword, folder, tag, pinned, archived, page = 1, limit = 10 } = searchDto;

    const queryBuilder = this.noteRepository
      .createQueryBuilder("note")
      .leftJoinAndSelect("note.folder", "folder")
      .leftJoinAndSelect("note.tags", "tags")
      .where("note.userId = :userId", { userId });

    if (keyword) {
      queryBuilder.andWhere(
        "(note.title LIKE :keyword OR note.content LIKE :keyword)",
        { keyword: `%${keyword}%` },
      );
    }

    if (folder) {
      queryBuilder.andWhere("note.folderId = :folder", { folder });
    }

    if (tag) {
      queryBuilder.andWhere("tags.id = :tag", { tag });
    }

    if (pinned !== undefined) {
      queryBuilder.andWhere("note.isPinned = :pinned", { pinned });
    }

    if (archived !== undefined) {
      queryBuilder.andWhere("note.isArchived = :archived", { archived });
    }

    const skip = (page - 1) * limit;

    const [data, total] = await queryBuilder
      .orderBy("note.createdAt", "DESC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }
}
