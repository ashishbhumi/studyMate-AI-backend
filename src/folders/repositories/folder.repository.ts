import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../../common/utils/repositories/base-repository";
import { getMysqlDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import { Folder } from "../folder.entity";

@Injectable()
export class FolderRepository extends BaseRepository<Folder> {
  constructor(
    @InjectRepository(Folder, getMysqlDataSource())
    private repository: Repository<Folder>,
  ) {
    super(repository);
  }

  async findByUserId(userId: number): Promise<Folder[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async findByIdAndUserId(id: number, userId: number): Promise<Folder | null> {
    return this.repository.findOne({
      where: { id, userId },
    });
  }
}
