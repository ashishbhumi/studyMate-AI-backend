import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SearchController } from "./controllers/search.controller";
import { SearchService } from "./services/search.service";
import { Note } from "../notes/note.entity";
import { getMysqlDataSource } from "../database/data-source";

@Module({
  imports: [TypeOrmModule.forFeature([Note], getMysqlDataSource())],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
