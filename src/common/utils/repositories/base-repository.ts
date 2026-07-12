import { ObjectLiteral, Repository } from "typeorm";

export class BaseRepository<T extends ObjectLiteral> {
  constructor(protected baseRepository: Repository<T>) {}

  getRepository() {
    return this.baseRepository;
  }

  getEntityManager() {
    return this.baseRepository.manager;
  }
}
