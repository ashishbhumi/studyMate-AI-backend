import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../../common/utils/repositories/base-repository";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { getMysqlDataSource } from "../../database/data-source";

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User, getMysqlDataSource())
    private repository: Repository<User>,
  ) {
    super(repository);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    return this.repository.findOne({
      where: { refreshToken },
    });
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.repository.update(userId, { refreshToken });
  }

  async clearRefreshToken(userId: number): Promise<void> {
    await this.repository.update(userId, { refreshToken: null });
  }
}
