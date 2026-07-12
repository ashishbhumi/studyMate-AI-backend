import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../../common/utils/repositories/base-repository";
import { getMysqlDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import { Tag } from "../tag.entity";

@Injectable()
export class TagRepository extends BaseRepository<Tag> {
  constructor(
    @InjectRepository(Tag, getMysqlDataSource())
    private repository: Repository<Tag>,
  ) {
    super(repository);
  }

  async findByUserId(userId: string): Promise<Tag[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async findByIdAndUserId(id: string, userId: string): Promise<Tag | null> {
    return this.repository.findOne({
      where: { id, userId },
    });
  }

  async findByIdsAndUserIds(tagIds: string[], userId: string): Promise<Tag[]> {
    return this.repository.find({
      where: { id: tagIds as any, userId },
    });
  }
}
