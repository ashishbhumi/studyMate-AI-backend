import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsController } from "./controllers/tags.controller";
import { TagsService } from "./services/tags.service";
import { TagRepository } from "./repositories/tag.repository";
import { Tag } from "./tag.entity";
import { getMysqlDataSource } from "../database/data-source";

@Module({
  imports: [TypeOrmModule.forFeature([Tag], getMysqlDataSource())],
  controllers: [TagsController],
  providers: [TagsService, TagRepository],
  exports: [TagsService, TagRepository],
})
export class TagsModule {}
