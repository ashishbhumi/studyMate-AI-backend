import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../../common/utils/repositories/base-repository";
import { getMysqlDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import { Note } from "../note.entity";

@Injectable()
export class NoteRepository extends BaseRepository<Note> {
  constructor(
    @InjectRepository(Note, getMysqlDataSource())
    private repository: Repository<Note>,
  ) {
    super(repository);
  }

  async findByUserId(userId: number): Promise<Note[]> {
    return this.repository.find({
      where: { userId },
      relations: ["folder", "tags"],
      order: { createdAt: "DESC" },
    });
  }

  async findByIdAndUserId(id: number, userId: number): Promise<Note | null> {
    return this.repository.findOne({
      where: { id, userId },
      relations: ["folder", "tags"],
    });
  }

  async findByUserIdWithPagination(
    userId: number,
    page: number,
    limit: number,
    sortBy: string = "createdAt",
    sortOrder: "ASC" | "DESC" = "DESC",
    filters?: { folderId?: number; isPinned?: boolean; isArchived?: boolean },
  ): Promise<{ data: Note[]; total: number }> {
    const skip = (page - 1) * limit;

    const where: any = { userId };

    if (filters?.folderId) {
      where.folderId = filters.folderId;
    }

    if (filters?.isPinned !== undefined) {
      where.isPinned = filters.isPinned;
    }

    if (filters?.isArchived !== undefined) {
      where.isArchived = filters.isArchived;
    }

    const [data, total] = await this.repository.findAndCount({
      where,
      relations: ["folder", "tags"],
      order: { [sortBy]: sortOrder as any },
      skip,
      take: limit,
    });

    return { data, total };
  }
}
