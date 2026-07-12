import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoldersController } from "./controllers/folders.controller";
import { FoldersService } from "./services/folders.service";
import { FolderRepository } from "./repositories/folder.repository";
import { Folder } from "./folder.entity";
import { getMysqlDataSource } from "../database/data-source";

@Module({
  imports: [TypeOrmModule.forFeature([Folder], getMysqlDataSource())],
  controllers: [FoldersController],
  providers: [FoldersService, FolderRepository],
  exports: [FoldersService, FolderRepository],
})
export class FoldersModule {}
