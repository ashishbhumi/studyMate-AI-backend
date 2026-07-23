import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { FlashcardEntity } from "../entity/flashcard.entity";
import { BaseRepository } from "src/common/utils/repositories/base-repository";
import { getMysqlDataSource } from "src/database/data-source";

@Injectable()
export class FlashcardRepository extends BaseRepository<FlashcardEntity> {
  constructor(
    @InjectRepository(FlashcardEntity, getMysqlDataSource())
    private repository: Repository<FlashcardEntity>,
  ) {
    super(repository);
  }

  async findByNoteId(noteId: number): Promise<FlashcardEntity[]> {
    return this.repository.find({
      where: { noteId },
      order: { version: "DESC", createdAt: "DESC" },
    });
  }

  async findLatestVersion(noteId: number): Promise<number> {
    const result = await this.repository
      .createQueryBuilder("flashcard")
      .select("MAX(flashcard.version)", "maxVersion")
      .where("flashcard.noteId = :noteId", { noteId })
      .getRawOne();

    return result?.maxVersion || 0;
  }

  async findByNoteIdAndVersion(
    noteId: number,
    version: number,
  ): Promise<FlashcardEntity[]> {
    return this.repository.find({
      where: { noteId, version },
      order: { createdAt: "ASC" },
    });
  }

  async deleteByVersion(noteId: number, version: number): Promise<void> {
    await this.repository.delete({ noteId, version });
  }

  async deleteByNoteId(noteId: number): Promise<void> {
    await this.repository.delete({ noteId });
  }
}
