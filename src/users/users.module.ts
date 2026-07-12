import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { UserRepository } from "./repositories/user.repository";
import { User } from "./user.entity";
import { getMysqlDataSource } from "../database/data-source";

@Module({
  imports: [TypeOrmModule.forFeature([User], getMysqlDataSource())],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
